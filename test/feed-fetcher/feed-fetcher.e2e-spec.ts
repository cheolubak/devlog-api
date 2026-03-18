import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import {
  FeedType,
  FetchStatus,
  RegionType,
} from '../../src/database/generated/prisma';
import { PrismaService } from '../../src/database/prisma.service';
import { FeedParserService } from '../../src/feed-fetcher/feed-parser.service';
import { WebScraperService } from '../../src/feed-fetcher/web-scraper.service';
import { YoutubeFetcherService } from '../../src/feed-fetcher/youtube-fetcher.service';
import {
  createMockEmptyFeed,
  createMockRssFeed,
  createMockScrapingFeed,
  createMockYoutubeFetchResult,
} from '../fixtures/feed.fixtures';
import { createTestApp } from '../helpers/test-app.helper';
import { cleanDatabase } from '../prisma-test.utils';

describe('FeedFetcher (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let feedParserService: jest.Mocked<FeedParserService>;
  let youtubeFetcherService: jest.Mocked<YoutubeFetcherService>;
  let webScraperService: jest.Mocked<WebScraperService>;

  beforeAll(async () => {
    const testApp = await createTestApp();
    app = testApp.app;
    prisma = testApp.prisma;
    feedParserService = testApp.feedParserService as any;
    youtubeFetcherService = testApp.youtubeFetcherService as any;
    webScraperService = testApp.webScraperService as any;
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(async () => {
    await cleanDatabase(prisma);
    jest.clearAllMocks();
  });

  describe('POST /feed-fetcher/fetch/:sourceId (RSS)', () => {
    it('should fetch RSS feed and save posts to DB', async () => {
      const source = await prisma.blogSource.create({
        data: {
          blogUrl: 'https://blog.com',
          name: 'RSS Blog',
          region: RegionType.KOREA,
          type: FeedType.RSS,
          url: 'https://blog.com/rss',
        },
      });

      feedParserService.parseFeed.mockResolvedValue(createMockRssFeed());

      const { body } = await request(app.getHttpServer())
        .post(`/feed-fetcher/fetch/${source.id}`)
        .expect(201);

      expect(body.success).toBe(true);
      expect(body.newPostsCount).toBe(2);

      const posts = await prisma.posts.findMany({
        where: { sourceId: source.id },
      });
      expect(posts).toHaveLength(2);

      const updatedSource = await prisma.blogSource.findUnique({
        where: { id: source.id },
      });
      expect(updatedSource.lastFetchStatus).toBe(FetchStatus.SUCCESS);
      expect(updatedSource.totalPostsFetched).toBe(2);
    });

    it('should skip duplicate posts', async () => {
      const source = await prisma.blogSource.create({
        data: {
          blogUrl: 'https://blog.com',
          name: 'RSS Blog',
          region: RegionType.KOREA,
          type: FeedType.RSS,
          url: 'https://blog.com/rss',
        },
      });

      await prisma.posts.create({
        data: {
          content: 'existing',
          sourceId: source.id,
          sourceUrl: 'https://example-blog.com/post-1',
          title: 'Existing Post',
        },
      });

      feedParserService.parseFeed.mockResolvedValue(createMockRssFeed());

      const { body } = await request(app.getHttpServer())
        .post(`/feed-fetcher/fetch/${source.id}`)
        .expect(201);

      expect(body.newPostsCount).toBe(1);
    });

    it('should create tags for posts', async () => {
      const source = await prisma.blogSource.create({
        data: {
          blogUrl: 'https://blog.com',
          name: 'RSS Blog',
          region: RegionType.KOREA,
          type: FeedType.RSS,
          url: 'https://blog.com/rss',
        },
      });

      feedParserService.parseFeed.mockResolvedValue(createMockRssFeed());

      await request(app.getHttpServer())
        .post(`/feed-fetcher/fetch/${source.id}`)
        .expect(201);

      const tags = await prisma.tags.findMany();
      expect(tags.length).toBeGreaterThan(0);

      const tagNames = tags.map((t) => t.name);
      expect(tagNames).toContain('javascript');
      expect(tagNames).toContain('nodejs');
      expect(tagNames).toContain('typescript');
    });

    it('should handle empty feed', async () => {
      const source = await prisma.blogSource.create({
        data: {
          blogUrl: 'https://blog.com',
          name: 'RSS Blog',
          region: RegionType.KOREA,
          type: FeedType.RSS,
          url: 'https://blog.com/rss',
        },
      });

      feedParserService.parseFeed.mockResolvedValue(createMockEmptyFeed());

      const { body } = await request(app.getHttpServer())
        .post(`/feed-fetcher/fetch/${source.id}`)
        .expect(201);

      expect(body.success).toBe(true);
      expect(body.newPostsCount).toBe(0);
    });

    it('should set FAILED status on parsing error', async () => {
      const source = await prisma.blogSource.create({
        data: {
          blogUrl: 'https://blog.com',
          name: 'RSS Blog',
          region: RegionType.KOREA,
          type: FeedType.RSS,
          url: 'https://blog.com/rss',
        },
      });

      feedParserService.parseFeed.mockRejectedValue(
        new Error('Failed to parse feed'),
      );

      const { body } = await request(app.getHttpServer())
        .post(`/feed-fetcher/fetch/${source.id}`)
        .expect(201);

      expect(body.success).toBe(false);

      const updatedSource = await prisma.blogSource.findUnique({
        where: { id: source.id },
      });
      expect(updatedSource.lastFetchStatus).toBe(FetchStatus.FAILED);
      expect(updatedSource.lastFetchError).toContain('Failed to parse feed');
    });
  });

  describe('POST /feed-fetcher/fetch/:sourceId (YOUTUBE)', () => {
    it('should fetch YouTube videos and save to DB', async () => {
      const source = await prisma.blogSource.create({
        data: {
          blogUrl: 'https://youtube.com/@testchannel',
          name: 'YT Channel',
          region: RegionType.FOREIGN,
          type: FeedType.YOUTUBE,
          url: 'https://youtube.com/@testchannel',
        },
      });

      youtubeFetcherService.fetchVideos.mockResolvedValue(
        createMockYoutubeFetchResult(),
      );

      const { body } = await request(app.getHttpServer())
        .post(`/feed-fetcher/fetch/${source.id}`)
        .expect(201);

      expect(body.success).toBe(true);
      expect(body.newPostsCount).toBe(2);

      const posts = await prisma.posts.findMany({
        where: { sourceId: source.id },
      });
      expect(posts).toHaveLength(2);
    });

    it('should cache channelId in metadata', async () => {
      const source = await prisma.blogSource.create({
        data: {
          blogUrl: 'https://youtube.com/@testchannel',
          name: 'YT Channel',
          region: RegionType.FOREIGN,
          type: FeedType.YOUTUBE,
          url: 'https://youtube.com/@testchannel',
        },
      });

      youtubeFetcherService.fetchVideos.mockResolvedValue(
        createMockYoutubeFetchResult(),
      );

      await request(app.getHttpServer())
        .post(`/feed-fetcher/fetch/${source.id}`)
        .expect(201);

      const updatedSource = await prisma.blogSource.findUnique({
        where: { id: source.id },
      });
      expect((updatedSource.metadata as any)?.channelId).toBe(
        'UC_test_channel_id',
      );
    });
  });

  describe('POST /feed-fetcher/fetch/:sourceId (SCRAPING)', () => {
    it('should fetch scraped posts and save to DB', async () => {
      const source = await prisma.blogSource.create({
        data: {
          blogUrl: 'https://scrape.com',
          name: 'Scraping Blog',
          region: RegionType.KOREA,
          scrapingConfig: {
            listSelector: '.post-item',
            renderMode: 'static',
            selectors: { link: 'a', title: '.title' },
          },
          type: FeedType.SCRAPING,
          url: 'https://scrape.com/posts',
        },
      });

      webScraperService.scrape.mockResolvedValue(createMockScrapingFeed());

      const { body } = await request(app.getHttpServer())
        .post(`/feed-fetcher/fetch/${source.id}`)
        .expect(201);

      expect(body.success).toBe(true);
      expect(body.newPostsCount).toBe(2);
    });

    it('should fail when scrapingConfig is missing', async () => {
      const source = await prisma.blogSource.create({
        data: {
          blogUrl: 'https://scrape.com',
          name: 'Scraping No Config',
          region: RegionType.KOREA,
          type: FeedType.SCRAPING,
          url: 'https://scrape.com/no-config',
        },
      });

      const { body } = await request(app.getHttpServer())
        .post(`/feed-fetcher/fetch/${source.id}`)
        .expect(201);

      expect(body.success).toBe(false);
      expect(body.message).toContain('Scraping config is required');
    });
  });

  describe('POST /feed-fetcher/fetch-all', () => {
    it('should fetch all active sources', async () => {
      await prisma.blogSource.create({
        data: {
          blogUrl: 'https://blog1.com',
          name: 'Blog 1',
          region: RegionType.KOREA,
          type: FeedType.RSS,
          url: 'https://blog1.com/rss',
        },
      });

      await prisma.blogSource.create({
        data: {
          blogUrl: 'https://blog2.com',
          name: 'Blog 2',
          region: RegionType.KOREA,
          type: FeedType.RSS,
          url: 'https://blog2.com/rss',
        },
      });

      await prisma.blogSource.create({
        data: {
          blogUrl: 'https://inactive.com',
          isActive: false,
          name: 'Inactive',
          region: RegionType.KOREA,
          type: FeedType.RSS,
          url: 'https://inactive.com/rss',
        },
      });

      feedParserService.parseFeed.mockResolvedValue(createMockRssFeed());

      const { body } = await request(app.getHttpServer())
        .post('/feed-fetcher/fetch-all')
        .expect(201);

      expect(body.total).toBe(2);
      expect(body.successful).toBe(2);
      expect(body.failed).toBe(0);
    });

    it('should report partial success', async () => {
      await prisma.blogSource.create({
        data: {
          blogUrl: 'https://good.com',
          name: 'Good Source',
          region: RegionType.KOREA,
          type: FeedType.RSS,
          url: 'https://good.com/rss',
        },
      });

      await prisma.blogSource.create({
        data: {
          blogUrl: 'https://bad.com',
          name: 'Bad Source',
          region: RegionType.KOREA,
          type: FeedType.RSS,
          url: 'https://bad.com/rss',
        },
      });

      feedParserService.parseFeed
        .mockResolvedValueOnce(createMockRssFeed())
        .mockRejectedValueOnce(new Error('Network error'));

      const { body } = await request(app.getHttpServer())
        .post('/feed-fetcher/fetch-all')
        .expect(201);

      expect(body.total).toBe(2);
      expect(body.successful).toBe(1);
      expect(body.failed).toBe(1);
    });
  });
});
