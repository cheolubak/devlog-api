import { Controller, Get, Param, Post } from '@nestjs/common';

import { FeedFetcherService } from './feed-fetcher.service';

@Controller('feed-fetcher')
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

  @Get('cron')
  async cron() {
    return this.feedFetcherService.fetchAllActiveSources();
  }
}
