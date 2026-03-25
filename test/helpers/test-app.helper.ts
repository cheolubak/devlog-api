import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { AppModule } from '../../src/app.module';
import { PrismaService } from '../../src/database/prisma.service';
import { FeedParserService } from '../../src/feed-fetcher/feed-parser.service';
import { FeedSchedulerService } from '../../src/feed-fetcher/feed-scheduler.service';
import { WebScraperService } from '../../src/feed-fetcher/web-scraper.service';
import { YoutubeFetcherService } from '../../src/feed-fetcher/youtube-fetcher.service';

export interface TestApp {
  app: INestApplication;
  feedParserService: FeedParserService;
  prisma: PrismaService;
  webScraperService: WebScraperService;
  youtubeFetcherService: YoutubeFetcherService;
}

export async function createTestApp(): Promise<TestApp> {
  const mockFeedParserService = {
    parseFeed: jest.fn(),
  };

  const mockYoutubeFetcherService = {
    fetchVideos: jest.fn(),
  };

  const mockWebScraperService = {
    onModuleDestroy: jest.fn(),
    scrape: jest.fn(),
  };

  const mockFeedSchedulerService = {
    handleHourlyFetch: jest.fn(),
  };

  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  })
    .overrideProvider(FeedParserService)
    .useValue(mockFeedParserService)
    .overrideProvider(YoutubeFetcherService)
    .useValue(mockYoutubeFetcherService)
    .overrideProvider(WebScraperService)
    .useValue(mockWebScraperService)
    .overrideProvider(FeedSchedulerService)
    .useValue(mockFeedSchedulerService)
    .compile();

  const app = moduleFixture.createNestApplication();

  await app.init();

  const prisma = app.get(PrismaService);

  return {
    app,
    feedParserService: mockFeedParserService as any,
    prisma,
    webScraperService: mockWebScraperService as any,
    youtubeFetcherService: mockYoutubeFetcherService as any,
  };
}
