import { Injectable, Logger } from '@nestjs/common';

import { AlertService } from '../alert/alert.service';
import { BlogSourcesService } from '../blog-sources/blog-sources.service';
import {
  BlogSource,
  FeedType,
  FetchStatus,
  RegionType,
} from '../database/generated/prisma/client';
import { PrismaService } from '../database/prisma.service';
import { ImageParseService } from '../image-parse/image-parse.service';
import { TranslateService } from '../translate/translate.service';
import { FeedParserService } from './feed-parser.service';
import { FeedItem, ParsedFeed } from './interfaces/feed-item.interface';
import { ScrapingConfig } from './interfaces/scraping-config.interface';
import { KeywordExtractorService } from './keyword-extractor.service';
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
    private readonly keywordExtractorService: KeywordExtractorService,
    private readonly webScraperService: WebScraperService,
    private readonly youtubeFetcherService: YoutubeFetcherService,
    private readonly imageParseService: ImageParseService,
    private readonly alertService: AlertService,
    private readonly translateService: TranslateService,
  ) {}

  async fetchFromSource(sourceId: string, useAi = false) {
    const source = await this.blogSourcesService.findOne(sourceId);

    if (!source.isActive) {
      this.logger.warn(`Source ${source.name} is not active, skipping`);
      return { message: 'Source is not active', success: false };
    }

    try {
      const feed = await this.getFeedByType(source);

      if (!feed.items || feed.items.length === 0) {
        await this.blogSourcesService.updateFetchStatus(
          sourceId,
          FetchStatus.SUCCESS,
          undefined,
          0,
        );
        return { message: 'No new items', newPostsCount: 0, success: true };
      }

      let successCount = 0;
      let failureCount = 0;

      for (const item of feed.items) {
        try {
          const result = await this.processAndSaveItem(item, source, useAi);
          if (result.created) {
            successCount++;
          }
        } catch {
          failureCount++;
        }
      }

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
        failureCount > 0
          ? `${failureCount} items failed to process`
          : undefined,
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
    } catch (error: unknown) {
      this.logger.error(
        `Error fetching from source ${source.name}: ${(error as Error).message}`,
      );
      await this.blogSourcesService.updateFetchStatus(
        sourceId,
        FetchStatus.FAILED,
        (error as Error).message,
      );
      return { message: (error as Error).message, success: false };
    }
  }

  async setFetchActiveSources() {
    const notExistsInQueueSources = await this.prisma.$queryRaw<
      {
        id: string;
      }[]
    >`
          SELECT id
          FROM "BlogSource" b
                 LEFT JOIN blog_source_fetch_queue q ON b.id = q.source_id
          WHERE q.source_id IS NULL
            AND b."isActive" = true
        `;

    if (notExistsInQueueSources.length > 0) {
      await this.prisma.blogSourceFetchQueue.createMany({
        data: notExistsInQueueSources.map((source) => ({
          sourceId: source.id,
        })),
        skipDuplicates: true,
      });

      this.logger.log(
        `Add BlogSource into Queue : ${notExistsInQueueSources.length} sources`,
      );

      this.alertService.sendAlert(
        `Add BlogSource into Queue : ${notExistsInQueueSources.length} sources`,
      );

      return {
        saveCount: notExistsInQueueSources.length,
      };
    }
  }

  async fetchSourcesFromQueue() {
    const sources = await this.prisma.blogSourceFetchQueue.findMany({
      orderBy: {
        createdAt: 'asc',
      },
      select: {
        sourceId: true,
      },
      take: 5,
    });

    if (sources.length === 0) {
      return true;
    }

    const processedSourceIds: string[] = [];

    for (const source of sources) {
      try {
        await this.fetchFromSource(source.sourceId, true);
        processedSourceIds.push(source.sourceId);
      } catch (error: unknown) {
        this.logger.error(
          `Failed to fetch source ${source.sourceId}: ${(error as Error).message}`,
        );
      }
    }

    if (processedSourceIds.length > 0) {
      await this.prisma.blogSourceFetchQueue.deleteMany({
        where: {
          sourceId: { in: processedSourceIds },
        },
      });
    }
  }

  async translateUntranslatedPosts() {
    const KOREAN_REGEX = /[가-힣]/;

    const posts = await this.prisma.posts.findMany({
      select: {
        description: true,
        id: true,
        title: true,
      },
      where: {
        deletionLog: null,
        isDisplay: true,
        source: {
          region: RegionType.FOREIGN,
        },
      },
    });

    const untranslatedPosts = posts.filter(
      (post) => !KOREAN_REGEX.test(post.title),
    );

    this.logger.log(
      `Found ${untranslatedPosts.length} untranslated posts out of ${posts.length} total`,
    );

    let successCount = 0;
    let failCount = 0;

    for (const post of untranslatedPosts) {
      try {
        const translatedTitle =
          (await this.translateService.translate(post.title, 'ko')) ??
          post.title;
        const translatedDescription = post.description
          ? ((await this.translateService.translate(post.description, 'ko')) ??
            post.description)
          : post.description;

        await this.prisma.posts.update({
          data: {
            description: translatedDescription,
            title: translatedTitle,
          },
          where: { id: post.id },
        });

        successCount++;
      } catch (error: unknown) {
        failCount++;
        this.logger.warn(
          `Failed to translate post ${post.id}: ${(error as Error).message}`,
        );
      }
    }

    this.logger.log(
      `Translation completed: ${successCount} success, ${failCount} failed`,
    );

    return {
      failed: failCount,
      successful: successCount,
      total: untranslatedPosts.length,
    };
  }

  async fetchAllActiveSources() {
    const sources = await this.blogSourcesService.findAllActive();
    this.logger.log(
      `Starting batch fetch for ${sources.length} active sources`,
    );

    let successCount = 0;

    for (const source of sources) {
      try {
        const result = await this.fetchFromSource(source.id, true);
        if (result.success) {
          successCount++;
        }
      } catch (error: unknown) {
        this.logger.error(
          `Failed to fetch source ${source.name}: ${(error as Error).message}`,
        );
      }
    }

    this.logger.log(
      `Batch fetch completed: ${successCount}/${sources.length} sources successful`,
    );

    this.alertService.sendAlert(
      `Feed Fetch Request : ${successCount}/${sources.length} sources successful`,
    );

    return {
      failed: sources.length - successCount,
      successful: successCount,
      total: sources.length,
    };
  }

  private async getFeedByType(source: BlogSource): Promise<ParsedFeed> {
    switch (source.type) {
      case FeedType.ATOM:
      case FeedType.RSS:
        return this.feedParserService.parseFeed(source.url);
      case FeedType.SCRAPING:
        if (!source.scrapingConfig) {
          throw new Error('Scraping config is required for SCRAPING type');
        }
        return this.webScraperService.scrape(
          source.url,
          source.scrapingConfig as unknown as ScrapingConfig,
        );
      case FeedType.YOUTUBE: {
        const metadata = source.metadata as null | { channelId?: string };
        const cachedChannelId = metadata?.channelId;

        // Get existing video URLs for this source to skip Shorts filtering
        const existingPosts = await this.prisma.posts.findMany({
          select: { sourceUrl: true },
          where: { sourceId: source.id },
        });
        const existingVideoUrls = new Set(
          existingPosts.map((p) => p.sourceUrl).filter(Boolean) as string[],
        );

        const result = await this.youtubeFetcherService.fetchVideos(
          source.url,
          { cachedChannelId, existingVideoUrls },
        );

        // Cache the channelId if not already cached
        if (!cachedChannelId && result.channelId) {
          await this.prisma.blogSource.update({
            data: { metadata: { channelId: result.channelId } },
            where: { id: source.id },
          });
          this.logger.log(
            `Cached channel ID ${result.channelId} for source ${source.name}`,
          );
        }

        return result.feed;
      }
      default:
        throw new Error(`Unknown feed type: ${source.type}`);
    }
  }

  private async processAndSaveItem(
    item: FeedItem,
    source: BlogSource,
    useAi = false,
  ) {
    try {
      if (!item.link) {
        throw new Error('Item has no link');
      }

      const existing = await this.prisma.posts.findUnique({
        select: {
          id: true,
        },
        where: { sourceUrl: item.link },
      });

      if (existing) {
        return { created: false, post: existing };
      }

      let title = FeedNormalizerUtil.truncateText(item.title, 200);
      let titleEn: null | string = null;

      let description = FeedNormalizerUtil.extractDescription(
        item.content || '',
        item.contentSnippet || '',
      );
      let descriptionEn: null | string = null;

      const imageUrl = FeedNormalizerUtil.extractFirstImage(item.content || '');

      if (source.region === RegionType.FOREIGN) {
        try {
          title = (await this.translateService.translate(title, 'ko')) ?? title;
          description =
            (await this.translateService.translate(description, 'ko')) ??
            description;
        } catch (error: unknown) {
          this.logger.warn(
            `Translation failed for "${title}": ${(error as Error).message}`,
          );
        }
      } else {
        try {
          titleEn =
            (await this.translateService.translate(title, 'en')) ?? titleEn;
          descriptionEn =
            (await this.translateService.translate(description, 'en')) ??
            descriptionEn;
        } catch (error: unknown) {
          this.logger.warn(
            `Translation failed for "${title}": ${(error as Error).message}`,
          );
        }
      }

      const isTechPost = await this.keywordExtractorService.isTechBlogPost(
        title,
        item.link,
      );

      const post = await this.prisma.posts.create({
        data: {
          description,
          descriptionEn,
          isDisplay: isTechPost,
          originalAuthor: FeedNormalizerUtil.normalizeCreator(item.creator),
          originalPublishedAt: item.isoDate || item.pubDate || new Date(),
          sourceId: source.id,
          sourceUrl: item.link,
          title,
          titleEn,
        },
      });

      if (imageUrl) {
        try {
          const parseImageUrl = await this.imageParseService.uploadImageAsWebp(
            imageUrl.startsWith('http://') || imageUrl.startsWith('https://')
              ? imageUrl
              : `${new URL(source.blogUrl).origin}${imageUrl.startsWith('/') ? imageUrl : `/${imageUrl}`}`,
            `thumbnails/posts/${post.id}`,
          );

          await this.prisma.posts.update({
            data: { imageUrl: parseImageUrl },
            where: { id: post.id },
          });
        } catch (error) {
          this.logger.warn(
            `Failed to parse image URL for post ${post.id}: ${error instanceof Error ? error.message : error}`,
          );
        }
      }

      if (item.categories && item.categories.length > 0) {
        await this.createTagsForPost(post.id, item.categories);
      }

      if (useAi && isTechPost) {
        await this.extractAndSaveKeywords(post.id, post.title, item.link).catch(
          (error: unknown) => {
            this.logger.warn(
              `Keyword extraction failed for post ${post.id}: ${(error as Error).message}`,
            );
          },
        );
      }

      return { created: true, post };
    } catch (e: unknown) {
      this.logger.error(
        `Failed to process feed item: ${(e as Error).message}`,
        (e as Error).stack,
      );
      throw e;
    }
  }

  private async extractAndSaveKeywords(
    postId: string,
    title: string,
    sourceUrl: string,
  ) {
    const keywords = await this.keywordExtractorService.extractKeywords(
      title,
      sourceUrl,
    );

    if (keywords) {
      await this.prisma.postSearchKeywords.upsert({
        create: { keywords, postId },
        update: { keywords },
        where: { postId },
      });
    }
  }

  private async createTagsForPost(postId: string, categories: string[]) {
    const normalizedTags = categories
      .map((cat) => FeedNormalizerUtil.normalizeTag(cat))
      .filter((tag) => tag.length > 0)
      .slice(0, 10);

    if (normalizedTags.length === 0) return;

    const tagIds: number[] = [];
    for (const tagName of normalizedTags) {
      try {
        const tag = await this.prisma.tags.upsert({
          create: { count: 1, name: tagName },
          update: { count: { increment: 1 } },
          where: { name: tagName },
        });
        tagIds.push(tag.id);
      } catch (error: unknown) {
        this.logger.warn(
          `Failed to create tag ${tagName}: ${(error as Error).message}`,
        );
      }
    }

    if (tagIds.length > 0) {
      await this.prisma.postTags
        .createMany({
          data: tagIds.map((tagId) => ({ postId, tagId })),
          skipDuplicates: true,
        })
        .catch((error: unknown) => {
          this.logger.warn(
            `Failed to create postTags: ${(error as Error).message}`,
          );
        });
    }
  }
}
