import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { FeedFetcherService } from './feed-fetcher.service';

@Injectable()
export class FeedSchedulerService {
  private readonly logger = new Logger(FeedSchedulerService.name);

  constructor(private readonly feedFetcherService: FeedFetcherService) {}

  @Cron(CronExpression.EVERY_HOUR)
  async handleHourlyFetch() {
    this.logger.log('Starting scheduled feed fetch');

    try {
      const result = await this.feedFetcherService.fetchAllActiveSources();
      this.logger.log(
        `Scheduled fetch completed: ${result.successful}/${result.total} sources successful`,
      );
    } catch (error) {
      this.logger.error(`Scheduled fetch failed: ${error.message}`);
    }
  }
}
