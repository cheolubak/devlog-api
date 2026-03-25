import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron, CronExpression } from '@nestjs/schedule';

import { PrismaService } from '../../database/prisma.service';
import { getErrorMessage } from '../utils/error.util';

export enum ApiProvider {
  ANTHROPIC = 'ANTHROPIC',
  GOOGLE_TRANSLATE = 'GOOGLE_TRANSLATE',
  YOUTUBE = 'YOUTUBE',
}

@Injectable()
export class ApiUsageService implements OnModuleInit {
  private readonly cache = new Map<string, number>();
  private readonly limits: Record<string, number>;
  private readonly logger = new Logger(ApiUsageService.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService,
  ) {
    this.limits = {
      [ApiProvider.ANTHROPIC]:
        this.configService.get<number>('API_DAILY_LIMIT_ANTHROPIC') ?? 200,
      [ApiProvider.GOOGLE_TRANSLATE]:
        this.configService.get<number>('API_DAILY_LIMIT_GOOGLE_TRANSLATE') ??
        500,
      [ApiProvider.YOUTUBE]:
        this.configService.get<number>('API_DAILY_LIMIT_YOUTUBE') ?? 5000,
    };
  }

  async onModuleInit() {
    await this.loadTodayCounters();
  }

  async tryConsume(provider: ApiProvider, amount = 1): Promise<boolean> {
    const key = this.getDailyKey(provider);
    const count = this.cache.get(key) ?? 0;
    if (count + amount > this.limits[provider]) {
      return false;
    }

    const newCount = count + amount;
    this.cache.set(key, newCount);

    try {
      const today = this.getToday();
      await this.prisma.apiDailyUsage.upsert({
        create: { count: newCount, date: today, provider },
        update: { count: newCount },
        where: { provider_date: { date: today, provider } },
      });
    } catch (error) {
      this.logger.error(
        `Failed to persist API usage for ${provider}: ${getErrorMessage(error)}`,
      );
    }

    return true;
  }

  getUsage(provider: ApiProvider): { count: number; limit: number } {
    const key = this.getDailyKey(provider);
    return {
      count: this.cache.get(key) ?? 0,
      limit: this.limits[provider],
    };
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  resetDailyCounters() {
    this.cache.clear();
    this.logger.log('Daily API usage counters reset');
  }

  private async loadTodayCounters() {
    try {
      const today = this.getToday();
      const records = await this.prisma.apiDailyUsage.findMany({
        where: { date: today },
      });

      for (const record of records) {
        const key = this.getDailyKey(record.provider as ApiProvider);
        this.cache.set(key, record.count);
      }

      if (records.length > 0) {
        this.logger.log(
          `Loaded today's API usage from DB: ${records.map((r) => `${r.provider}=${r.count}`).join(', ')}`,
        );
      }
    } catch (error) {
      this.logger.error(
        `Failed to load API usage from DB: ${getErrorMessage(error)}`,
      );
    }
  }

  private getDailyKey(provider: ApiProvider): string {
    const today = new Date().toISOString().slice(0, 10);
    return `${provider}:${today}`;
  }

  private getToday(): Date {
    const now = new Date();
    return new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()));
  }
}
