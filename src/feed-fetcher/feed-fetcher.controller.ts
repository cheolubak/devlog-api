import { Controller, Param, Post } from '@nestjs/common';

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

  @Post('translate-untranslated')
  async translateUntranslated() {
    return this.feedFetcherService.translateUntranslatedPosts();
  }
}
