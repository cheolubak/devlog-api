import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { AlertModule } from '../alert/alert.module';
import { AuthModule } from '../auth/auth.module';
import { BlogSourcesModule } from '../blog-sources/blog-sources.module';
import { DatabaseModule } from '../database/database.module';
import { ImageParseModule } from '../image-parse/image-parse.module';
import { TranslateModule } from '../translate/translate.module';
import { FeedFetcherController } from './feed-fetcher.controller';
import { FeedFetcherService } from './feed-fetcher.service';
import { FeedParserService } from './feed-parser.service';
import { FeedSchedulerService } from './feed-scheduler.service';
import { KeywordExtractorService } from './keyword-extractor.service';
import { TagsConsistencyService } from './tags-consistency.service';
import { WebScraperService } from './web-scraper.service';
import { YoutubeFetcherService } from './youtube-fetcher.service';

@Module({
  controllers: [FeedFetcherController],
  exports: [FeedFetcherService, KeywordExtractorService],
  imports: [
    AuthModule,
    DatabaseModule,
    BlogSourcesModule,
    HttpModule,
    ImageParseModule,
    AlertModule,
    TranslateModule,
  ],
  providers: [
    FeedFetcherService,
    FeedParserService,
    FeedSchedulerService,
    KeywordExtractorService,
    WebScraperService,
    YoutubeFetcherService,
    TagsConsistencyService,
  ],
})
export class FeedFetcherModule {}
