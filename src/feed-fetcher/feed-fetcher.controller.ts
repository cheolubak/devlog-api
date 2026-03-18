import {
  Controller,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';

import { AdminGuard } from '../auth/admin.guard';
import { FeedFetcherService } from './feed-fetcher.service';

@ApiSecurity('admin-api-key')
@ApiTags('Feed Fetcher')
@Controller('feed-fetcher')
@Throttle({ default: { limit: 5, ttl: 60000 } })
@UseGuards(AdminGuard)
export class FeedFetcherController {
  constructor(private readonly feedFetcherService: FeedFetcherService) {}

  @ApiOperation({ summary: '특정 소스 피드 수집' })
  @Post('fetch/:sourceId')
  async fetchFromSource(@Param('sourceId', ParseUUIDPipe) sourceId: string) {
    return this.feedFetcherService.fetchFromSource(sourceId);
  }

  @ApiOperation({ summary: '전체 활성 소스 피드 수집' })
  @Post('fetch-all')
  async fetchAll() {
    return this.feedFetcherService.fetchAllActiveSources();
  }

  @ApiOperation({ summary: '미번역 포스트 번역' })
  @Post('translate-untranslated')
  async translateUntranslated() {
    return this.feedFetcherService.translateUntranslatedPosts();
  }
}
