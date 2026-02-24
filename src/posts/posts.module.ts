import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';
import { FeedFetcherModule } from '../feed-fetcher/feed-fetcher.module';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

@Module({
  controllers: [PostsController],
  exports: [PostsService],
  imports: [DatabaseModule, FeedFetcherModule],
  providers: [PostsService],
})
export class PostsModule {}
