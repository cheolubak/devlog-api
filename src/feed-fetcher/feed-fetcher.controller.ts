import { Controller, Param, Post, UseGuards } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';

import { AdminGuard } from '../auth/admin.guard';
import { FeedFetcherService } from './feed-fetcher.service';

@Controller('feed-fetcher')
@Throttle({ default: { limit: 5, ttl: 60000 } })
@UseGuards(AdminGuard)
export class FeedFetcherController {
  constructor(private readonly feedFetcherService: FeedFetcherService) {}

  @Post('fetch/:sourceId')
  async fetchFromSource(@Param('sourceId') sourceId: string) {
    return this.feedFetcherService.fetchFromSource(sourceId);
  }

  @Post('fetch-all')
  async fetchAll() {
    return this.feedFetcherService.fetchAllActiveSources();
  }

  @Post('translate-untranslated')
  async translateUntranslated() {
    return this.feedFetcherService.translateUntranslatedPosts();
  }
}
