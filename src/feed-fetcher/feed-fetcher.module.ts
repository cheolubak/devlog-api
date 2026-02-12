import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { BlogSourcesModule } from '../blog-sources/blog-sources.module';
import { DatabaseModule } from '../database/database.module';
import { FeedFetcherController } from './feed-fetcher.controller';
import { FeedFetcherService } from './feed-fetcher.service';
import { FeedParserService } from './feed-parser.service';
import { FeedSchedulerService } from './feed-scheduler.service';
import { WebScraperService } from './web-scraper.service';

@Module({
  controllers: [FeedFetcherController],
  exports: [FeedFetcherService],
  imports: [DatabaseModule, BlogSourcesModule, HttpModule],
  providers: [
    FeedFetcherService,
    FeedParserService,
    FeedSchedulerService,
    WebScraperService,
  ],
})
export class FeedFetcherModule {}
