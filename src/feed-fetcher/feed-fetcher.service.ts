import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { BlogSourcesService } from '../blog-sources/blog-sources.service';
import { FeedParserService } from './feed-parser.service';
import { FeedItem } from './interfaces/feed-item.interface';
import { FeedNormalizerUtil } from './utils/feed-normalizer.util';
import { generateContentHash } from './utils/content-hash.util';
import { FetchStatus } from '../database/generated/prisma';

@Injectable()
export class FeedFetcherService {
  private readonly logger = new Logger(FeedFetcherService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly blogSourcesService: BlogSourcesService,
    private readonly feedParserService: FeedParserService,
  ) {}

  async fetchFromSource(sourceId: string) {
    const source = await this.blogSourcesService.findOne(sourceId);

    if (!source.isActive) {
      this.logger.warn(`Source ${source.name} is not active, skipping`);
      return { success: false, message: 'Source is not active' };
    }

    try {
      this.logger.log(`Fetching from source: ${source.name}`);
      const feed = await this.feedParserService.parseFeed(source.url);

      if (!feed.items || feed.items.length === 0) {
        this.logger.log(`No items found in feed: ${source.name}`);
        await this.blogSourcesService.updateFetchStatus(
          sourceId,
          FetchStatus.SUCCESS,
          null,
          0,
        );
        return { success: true, message: 'No new items', newPostsCount: 0 };
      }

      const results = await Promise.allSettled(
        feed.items.map((item) => this.processAndSaveItem(item, sourceId)),
      );

      const successCount = results.filter(
        (r) => r.status === 'fulfilled' && r.value.created,
      ).length;
      const failureCount = results.filter((r) => r.status === 'rejected').length;

      let status: FetchStatus;
      if (failureCount === 0) {
        status = FetchStatus.SUCCESS;
      } else if (successCount > 0) {
        status = FetchStatus.PARTIAL;
      } else {
        status = FetchStatus.FAILED;
      }

      await this.blogSourcesService.updateFetchStatus(
        sourceId,
        status,
        failureCount > 0 ? `${failureCount} items failed to process` : null,
        successCount,
      );

      this.logger.log(
        `Fetch completed for ${source.name}: ${successCount} new posts, ${failureCount} failures`,
      );

      return {
        success: true,
        message: 'Fetch completed',
        newPostsCount: successCount,
        failureCount,
      };
    } catch (error) {
      this.logger.error(`Error fetching from source ${source.name}: ${error.message}`);
      await this.blogSourcesService.updateFetchStatus(
        sourceId,
        FetchStatus.FAILED,
        error.message,
      );
      return { success: false, message: error.message };
    }
  }

  async fetchAllActiveSources() {
    const sources = await this.blogSourcesService.findAllActive();
    this.logger.log(`Starting batch fetch for ${sources.length} active sources`);

    const results = await Promise.allSettled(
      sources.map((source) => this.fetchFromSource(source.id)),
    );

    const successCount = results.filter(
      (r) => r.status === 'fulfilled' && r.value.success,
    ).length;

    this.logger.log(
      `Batch fetch completed: ${successCount}/${sources.length} sources successful`,
    );

    return {
      total: sources.length,
      successful: successCount,
      failed: sources.length - successCount,
    };
  }

  private async processAndSaveItem(item: FeedItem, sourceId: string) {
    if (!item.link) {
      throw new Error('Item has no link');
    }

    const existing = await this.prisma.posts.findUnique({
      where: { sourceUrl: item.link },
    });

    if (existing) {
      this.logger.debug(`Post already exists: ${item.link}`);
      return { created: false, post: existing };
    }

    const content = item.content || item.contentSnippet || '';
    const description = FeedNormalizerUtil.extractDescription(
      item.content || '',
      item.contentSnippet || '',
    );
    const imageUrl = FeedNormalizerUtil.extractFirstImage(item.content || '');
    const contentHash = generateContentHash(content);

    const post = await this.prisma.posts.create({
      data: {
        title: FeedNormalizerUtil.truncateText(item.title, 500),
        content: content,
        sourceId: sourceId,
        sourceUrl: item.link,
        originalPublishedAt: item.isoDate || item.pubDate || new Date(),
        originalAuthor: item.creator,
        description: description,
        imageUrl: imageUrl,
        rawFeedData: item as any,
        contentHash: contentHash,
        isDisplay: false,
      },
    });

    if (item.categories && item.categories.length > 0) {
      await this.createTagsForPost(post.id, item.categories);
    }

    this.logger.debug(`Created new post: ${post.title}`);
    return { created: true, post };
  }

  private async createTagsForPost(postId: string, categories: string[]) {
    const normalizedTags = categories
      .map((cat) => FeedNormalizerUtil.normalizeTag(cat))
      .filter((tag) => tag.length > 0)
      .slice(0, 10);

    for (const tagName of normalizedTags) {
      try {
        const tag = await this.prisma.tags.upsert({
          where: { name: tagName },
          update: { count: { increment: 1 } },
          create: { name: tagName, count: 1 },
        });

        await this.prisma.postTags.create({
          data: {
            postId: postId,
            tagId: tag.id,
          },
        }).catch(() => {
          // Ignore duplicate postTag errors
        });
      } catch (error) {
        this.logger.warn(`Failed to create tag ${tagName}: ${error.message}`);
      }
    }
  }
}
