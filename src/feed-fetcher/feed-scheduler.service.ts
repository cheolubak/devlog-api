import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

import { FeedFetcherService } from './feed-fetcher.service';

@Injectable()
export class FeedSchedulerService {
  private readonly logger = new Logger(FeedSchedulerService.name);

  constructor(private readonly feedFetcherService: FeedFetcherService) {}

  @Cron(CronExpression.EVERY_HOUR)
  async handleHourlySetQueue() {
    this.logger.log('Starting scheduled feed queue update');

    try {
      await this.feedFetcherService.setFetchActiveSources();
    } catch (error) {
      this.logger.error(`Scheduled feed queue update failed: ${error.message}`);
    }
  }

  @Cron(CronExpression.EVERY_MINUTE)
  async handleMinuteCheckQueue() {
    this.logger.log('Starting scheduled feed fetch');

    try {
      await this.feedFetcherService.fetchSourcesFromQueue();
    } catch (error) {
      this.logger.error(`Scheduled fetch failed: ${error.message}`);
    }
  }
}
