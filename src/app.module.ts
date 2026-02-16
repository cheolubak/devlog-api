import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlogSourcesModule } from './blog-sources/blog-sources.module';
import { DatabaseModule } from './database/database.module';
import { FeedFetcherModule } from './feed-fetcher/feed-fetcher.module';
import { PostsModule } from './posts/posts.module';
import { SearchModule } from './search/search.module';

@Module({
  controllers: [AppController],
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ScheduleModule.forRoot(),
    DatabaseModule,
    BlogSourcesModule,
    FeedFetcherModule,
    PostsModule,
    SearchModule,
  ],
  providers: [AppService],
})
export class AppModule {}
