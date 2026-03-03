import { Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';
import { DatabaseModule } from '../database/database.module';
import { FeedFetcherModule } from '../feed-fetcher/feed-fetcher.module';
import { ImageParseModule } from '../image-parse/image-parse.module';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

@Module({
  controllers: [PostsController],
  exports: [PostsService],
  imports: [DatabaseModule, FeedFetcherModule, ImageParseModule, AuthModule],
  providers: [PostsService],
})
export class PostsModule {}
