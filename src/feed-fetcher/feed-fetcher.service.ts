import { Injectable, Logger } from '@nestjs/common';

import { BlogSourcesService } from '../blog-sources/blog-sources.service';
import { BlogSource, FeedType, FetchStatus } from '../database/generated/prisma';
import { PrismaService } from '../database/prisma.service';
import { FeedParserService } from './feed-parser.service';
import { FeedItem, ParsedFeed } from './interfaces/feed-item.interface';
import { ScrapingConfig } from './interfaces/scraping-config.interface';
import { generateContentHash } from './utils/content-hash.util';
import { FeedNormalizerUtil } from './utils/feed-normalizer.util';
import { WebScraperService } from './web-scraper.service';
import { YoutubeFetcherService } from './youtube-fetcher.service';

@Injectable()
export class FeedFetcherService {
  private readonly logger = new Logger(FeedFetcherService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly blogSourcesService: BlogSourcesService,
    private readonly feedParserService: FeedParserService,
    private readonly webScraperService: WebScraperService,
    private readonly youtubeFetcherService: YoutubeFetcherService,
  ) {}

  async fetchFromSource(sourceId: string) {
    const source = await this.blogSourcesService.findOne(sourceId);

    if (!source.isActive) {
      this.logger.warn(`Source ${source.name} is not active, skipping`);
      return { message: 'Source is not active', success: false };
    }

    try {
      this.logger.log(`Fetching from source: ${source.name}`);
      const feed = await this.getFeedByType(source);

      if (!feed.items || feed.items.length === 0) {
        this.logger.log(`No items found in feed: ${source.name}`);
        await this.blogSourcesService.updateFetchStatus(
          sourceId,
          FetchStatus.SUCCESS,
          null,
          0,
        );
        return { message: 'No new items', newPostsCount: 0, success: true };
      }

      const results = await Promise.allSettled(
        feed.items.map((item) => this.processAndSaveItem(item, sourceId)),
      );

      const successCount = results.filter(
        (r) => r.status === 'fulfilled' && r.value.created,
      ).length;
      const failureCount = results.filter(
        (r) => r.status === 'rejected',
      ).length;

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
        failureCount,
        message: 'Fetch completed',
        newPostsCount: successCount,
        success: true,
      };
    } catch (error) {
      this.logger.error(
        `Error fetching from source ${source.name}: ${error.message}`,
      );
      await this.blogSourcesService.updateFetchStatus(
        sourceId,
        FetchStatus.FAILED,
        error.message,
      );
      return { message: error.message, success: false };
    }
  }

  async fetchAllActiveSources() {
    const sources = await this.blogSourcesService.findAllActive();
    this.logger.log(
      `Starting batch fetch for ${sources.length} active sources`,
    );

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
      failed: sources.length - successCount,
      successful: successCount,
      total: sources.length,
    };
  }

  private async getFeedByType(source: BlogSource): Promise<ParsedFeed> {
    switch (source.type) {
      case FeedType.RSS:
      case FeedType.ATOM:
        return this.feedParserService.parseFeed(source.url);
      case FeedType.SCRAPING:
        if (!source.scrapingConfig) {
          throw new Error('Scraping config is required for SCRAPING type');
        }
        return this.webScraperService.scrape(
          source.url,
          source.scrapingConfig as unknown as ScrapingConfig,
        );
      case FeedType.YOUTUBE:
        return this.youtubeFetcherService.fetchVideos(source.url);
      default:
        throw new Error(`Unknown feed type: ${source.type}`);
    }
  }

  private async processAndSaveItem(item: FeedItem, sourceId: string) {
    try {
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
          content: content,
          contentHash: contentHash,
          description: description,
          imageUrl: imageUrl,
          isDisplay: false,
          originalAuthor: FeedNormalizerUtil.normalizeCreator(item.creator),
          originalPublishedAt: item.isoDate || item.pubDate || new Date(),
          rawFeedData: item as any,
          sourceId: sourceId,
          sourceUrl: item.link,
          title: FeedNormalizerUtil.truncateText(item.title, 500),
        },
      });

      if (item.categories && item.categories.length > 0) {
        await this.createTagsForPost(post.id, item.categories);
      }

      this.logger.debug(`Created new post: ${post.title}`);
      return { created: true, post };
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  private async createTagsForPost(postId: string, categories: string[]) {
    const normalizedTags = categories
      .map((cat) => FeedNormalizerUtil.normalizeTag(cat))
      .filter((tag) => tag.length > 0)
      .slice(0, 10);

    for (const tagName of normalizedTags) {
      try {
        const tag = await this.prisma.tags.upsert({
          create: { count: 1, name: tagName },
          update: { count: { increment: 1 } },
          where: { name: tagName },
        });

        await this.prisma.postTags
          .create({
            data: {
              postId: postId,
              tagId: tag.id,
            },
          })
          .catch(() => {
            // Ignore duplicate postTag errors
          });
      } catch (error) {
        this.logger.warn(`Failed to create tag ${tagName}: ${error.message}`);
      }
    }
  }
}
