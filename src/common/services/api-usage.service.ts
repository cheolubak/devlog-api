import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron, CronExpression } from '@nestjs/schedule';

export enum ApiProvider {
  ANTHROPIC = 'ANTHROPIC',
  GOOGLE_TRANSLATE = 'GOOGLE_TRANSLATE',
  YOUTUBE = 'YOUTUBE',
}

@Injectable()
export class ApiUsageService {
  private readonly counters = new Map<string, number>();
  private readonly limits: Record<string, number>;
  private readonly logger = new Logger(ApiUsageService.name);

  constructor(private readonly configService: ConfigService) {
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

  canUse(provider: ApiProvider): boolean {
    const key = this.getDailyKey(provider);
    const count = this.counters.get(key) ?? 0;
    return count < this.limits[provider];
  }

  getUsage(provider: ApiProvider): { count: number; limit: number } {
    const key = this.getDailyKey(provider);
    return {
      count: this.counters.get(key) ?? 0,
      limit: this.limits[provider],
    };
  }

  record(provider: ApiProvider): void {
    const key = this.getDailyKey(provider);
    const count = this.counters.get(key) ?? 0;
    this.counters.set(key, count + 1);
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  resetDailyCounters() {
    this.counters.clear();
    this.logger.log('Daily API usage counters reset');
  }

  private getDailyKey(provider: ApiProvider): string {
    const today = new Date().toISOString().slice(0, 10);
    return `${provider}:${today}`;
  }
}
