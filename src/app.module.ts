import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { JwtModule } from '@nestjs/jwt';
import { ScheduleModule } from '@nestjs/schedule';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';

import { AlertModule } from './alert/alert.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BlogSourcesModule } from './blog-sources/blog-sources.module';
import { CommonModule } from './common/common.module';
import { DatabaseModule } from './database/database.module';
import { FeedFetcherModule } from './feed-fetcher/feed-fetcher.module';
import { ImageParseModule } from './image-parse/image-parse.module';
import { PostsModule } from './posts/posts.module';
import { RequestModule } from './request/request.module';
import { SearchModule } from './search/search.module';
import { TranslateModule } from './translate/translate.module';

@Module({
  controllers: [AppController],
  imports: [
    CacheModule.register({
      isGlobal: true,
      max: 100,
      ttl: 60 * 1000,
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    EventEmitterModule.forRoot(),
    ScheduleModule.forRoot(),
    ThrottlerModule.forRoot([
      {
        limit: 60,
        name: 'default',
        ttl: 60000,
      },
    ]),
    CommonModule,
    DatabaseModule,
    BlogSourcesModule,
    FeedFetcherModule,
    PostsModule,
    SearchModule,
    ImageParseModule,
    AuthModule,
    JwtModule.registerAsync({
      global: true,
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get('JWT_SECRET'),
          signOptions: { expiresIn: '1h' },
        };
      },
    }),
    RequestModule,
    AlertModule,
    TranslateModule,
  ],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
