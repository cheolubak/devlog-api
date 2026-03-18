import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

import { PrismaService } from '../database/prisma.service';
import { FeedFetcherService } from './feed-fetcher.service';

@Injectable()
export class FeedSchedulerService {
  private readonly logger = new Logger(FeedSchedulerService.name);

  constructor(
    private readonly feedFetcherService: FeedFetcherService,
    private readonly prisma: PrismaService,
  ) {}

  @Cron(CronExpression.EVERY_HOUR)
  async handleHourlySetQueue() {
    this.logger.log('Starting scheduled feed queue update');

    try {
      await this.feedFetcherService.setFetchActiveSources();
    } catch (error: unknown) {
      this.logger.error(
        `Scheduled feed queue update failed: ${(error as Error).message}`,
      );
      await this.tryReconnect(error);
    }
  }

  @Cron(CronExpression.EVERY_5_MINUTES)
  async handleMinuteCheckQueue() {
    this.logger.log('Starting scheduled feed fetch');

    try {
      await this.feedFetcherService.fetchSourcesFromQueue();
    } catch (error: unknown) {
      this.logger.error(`Scheduled fetch failed: ${(error as Error).message}`);
      await this.tryReconnect(error);
    }
  }

  private async tryReconnect(error: unknown) {
    const errorMessage = (error as Error).message;
    const isDbConnectionError =
      errorMessage?.includes("Can't reach database server") ||
      errorMessage?.includes(
        'Timed out fetching a new connection from the connection pool',
      ) ||
      errorMessage?.includes('Server has closed the connection');

    if (isDbConnectionError) {
      this.logger.warn('DB connection issue, attempting reconnect...');
      try {
        await this.prisma.reconnect();
        this.logger.log('DB reconnect successful');
      } catch (reconnectError: unknown) {
        this.logger.error(
          `DB reconnect failed: ${(reconnectError as Error).message}`,
        );
      }
    }
  }
}
