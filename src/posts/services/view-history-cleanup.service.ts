import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron, CronExpression } from '@nestjs/schedule';

import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class ViewHistoryCleanupService {
  private readonly logger = new Logger(ViewHistoryCleanupService.name);
  private readonly retentionDays: number;

  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {
    this.retentionDays =
      this.configService.get<number>('VIEW_HISTORY_RETENTION_DAYS') ?? 90;
  }

  @Cron(CronExpression.EVERY_DAY_AT_3AM)
  async cleanup() {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - this.retentionDays);

    try {
      const result = await this.prisma.postViewHistory.deleteMany({
        where: {
          createdAt: { lt: cutoffDate },
        },
      });

      if (result.count > 0) {
        this.logger.log(
          `Cleaned up ${result.count} view history records older than ${this.retentionDays} days`,
        );
      }
    } catch (error: unknown) {
      this.logger.error(
        `Failed to cleanup view history: ${(error as Error).message}`,
      );
    }
  }
}
