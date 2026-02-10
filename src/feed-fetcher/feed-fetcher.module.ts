import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { FeedFetcherService } from './feed-fetcher.service';
import { FeedFetcherController } from './feed-fetcher.controller';
import { FeedParserService } from './feed-parser.service';
import { FeedSchedulerService } from './feed-scheduler.service';
import { DatabaseModule } from '../database/database.module';
import { BlogSourcesModule } from '../blog-sources/blog-sources.module';

@Module({
  imports: [DatabaseModule, BlogSourcesModule, HttpModule],
  controllers: [FeedFetcherController],
  providers: [FeedFetcherService, FeedParserService, FeedSchedulerService],
  exports: [FeedFetcherService],
})
export class FeedFetcherModule {}
