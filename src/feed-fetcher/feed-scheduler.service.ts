import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

import { PrismaService } from '../database/prisma.service';
import { FeedFetcherService } from './feed-fetcher.service';

@Injectable()
export class FeedSchedulerService {
  private readonly logger = new Logger(FeedSchedulerService.name);
  private isFetching = false;
  private isSettingQueue = false;

  constructor(
    private readonly feedFetcherService: FeedFetcherService,
    private readonly prisma: PrismaService,
  ) {}

  @Cron(CronExpression.EVERY_HOUR)
  async handleHourlySetQueue() {
    if (this.isSettingQueue) {
      this.logger.warn('Previous queue update still running, skipping');
      return;
    }

    this.isSettingQueue = true;
    this.logger.log('Starting scheduled feed queue update');

    try {
      await this.feedFetcherService.setFetchActiveSources();
    } catch (error: unknown) {
      this.logger.error(
        `Scheduled feed queue update failed: ${this.getErrorMessage(error)}`,
      );
      await this.tryReconnect(error);
    } finally {
      this.isSettingQueue = false;
    }
  }

  @Cron(CronExpression.EVERY_5_MINUTES)
  async handleMinuteCheckQueue() {
    if (this.isFetching) {
      this.logger.warn('Previous feed fetch still running, skipping');
      return;
    }

    this.isFetching = true;
    this.logger.log('Starting scheduled feed fetch');

    try {
      await this.feedFetcherService.fetchSourcesFromQueue();
    } catch (error: unknown) {
      this.logger.error(
        `Scheduled fetch failed: ${this.getErrorMessage(error)}`,
      );
      await this.tryReconnect(error);
    } finally {
      this.isFetching = false;
    }
  }

  @Cron(CronExpression.EVERY_DAY_AT_3AM)
  async handleDailyTranslateRetry() {
    this.logger.log(
      'Starting scheduled translation retry for untranslated posts',
    );

    try {
      const result = await this.feedFetcherService.translateUntranslatedPosts();
      this.logger.log(
        `Translation retry completed: ${result.successful}/${result.total} success, ${result.failed} failed`,
      );
    } catch (error: unknown) {
      this.logger.error(
        `Scheduled translation retry failed: ${this.getErrorMessage(error)}`,
      );
      await this.tryReconnect(error);
    }
  }

  private getErrorMessage(error: unknown): string {
    if (error instanceof Error) return error.message;
    if (typeof error === 'string') return error;
    return String(error);
  }

  private async tryReconnect(error: unknown) {
    const errorMessage = this.getErrorMessage(error);
    const isDbConnectionError =
      errorMessage.includes("Can't reach database server") ||
      errorMessage.includes(
        'Timed out fetching a new connection from the connection pool',
      ) ||
      errorMessage.includes('Server has closed the connection');

    if (isDbConnectionError) {
      this.logger.warn('DB connection issue, attempting reconnect...');
      try {
        await this.prisma.reconnect();
        this.logger.log('DB reconnect successful');
      } catch (reconnectError: unknown) {
        this.logger.error(
          `DB reconnect failed: ${this.getErrorMessage(reconnectError)}`,
        );
      }
    }
  }
}
