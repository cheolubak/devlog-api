import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';

import { ApiProvider, ApiUsageService } from './api-usage.service';

describe('ApiUsageService', () => {
  let service: ApiUsageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ApiUsageService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockImplementation((key: string) => {
              const config: Record<string, number> = {
                API_DAILY_LIMIT_ANTHROPIC: 200,
                API_DAILY_LIMIT_GOOGLE_TRANSLATE: 500,
                API_DAILY_LIMIT_YOUTUBE: 5000,
              };
              return config[key];
            }),
          },
        },
      ],
    }).compile();

    service = module.get<ApiUsageService>(ApiUsageService);
  });

  describe('canUse', () => {
    it('should return true when under limit', () => {
      expect(service.canUse(ApiProvider.ANTHROPIC)).toBe(true);
    });

    it('should return false when at limit', () => {
      for (let i = 0; i < 200; i++) {
        service.record(ApiProvider.ANTHROPIC);
      }

      expect(service.canUse(ApiProvider.ANTHROPIC)).toBe(false);
    });

    it('should return false when over limit', () => {
      for (let i = 0; i < 201; i++) {
        service.record(ApiProvider.ANTHROPIC);
      }

      expect(service.canUse(ApiProvider.ANTHROPIC)).toBe(false);
    });

    it('should track each provider independently', () => {
      for (let i = 0; i < 200; i++) {
        service.record(ApiProvider.ANTHROPIC);
      }

      expect(service.canUse(ApiProvider.ANTHROPIC)).toBe(false);
      expect(service.canUse(ApiProvider.GOOGLE_TRANSLATE)).toBe(true);
      expect(service.canUse(ApiProvider.YOUTUBE)).toBe(true);
    });
  });

  describe('record', () => {
    it('should increment the counter', () => {
      expect(service.getUsage(ApiProvider.ANTHROPIC).count).toBe(0);

      service.record(ApiProvider.ANTHROPIC);
      expect(service.getUsage(ApiProvider.ANTHROPIC).count).toBe(1);

      service.record(ApiProvider.ANTHROPIC);
      expect(service.getUsage(ApiProvider.ANTHROPIC).count).toBe(2);
    });
  });

  describe('getUsage', () => {
    it('should return current count and limit', () => {
      const usage = service.getUsage(ApiProvider.ANTHROPIC);

      expect(usage).toEqual({
        count: 0,
        limit: 200,
      });
    });

    it('should return updated count after recording', () => {
      service.record(ApiProvider.GOOGLE_TRANSLATE);
      service.record(ApiProvider.GOOGLE_TRANSLATE);
      service.record(ApiProvider.GOOGLE_TRANSLATE);

      const usage = service.getUsage(ApiProvider.GOOGLE_TRANSLATE);

      expect(usage).toEqual({
        count: 3,
        limit: 500,
      });
    });

    it('should return correct limit for each provider', () => {
      expect(service.getUsage(ApiProvider.ANTHROPIC).limit).toBe(200);
      expect(service.getUsage(ApiProvider.GOOGLE_TRANSLATE).limit).toBe(500);
      expect(service.getUsage(ApiProvider.YOUTUBE).limit).toBe(5000);
    });
  });

  describe('resetDailyCounters', () => {
    it('should clear all counters', () => {
      service.record(ApiProvider.ANTHROPIC);
      service.record(ApiProvider.GOOGLE_TRANSLATE);
      service.record(ApiProvider.YOUTUBE);

      expect(service.getUsage(ApiProvider.ANTHROPIC).count).toBe(1);
      expect(service.getUsage(ApiProvider.GOOGLE_TRANSLATE).count).toBe(1);
      expect(service.getUsage(ApiProvider.YOUTUBE).count).toBe(1);

      service.resetDailyCounters();

      expect(service.getUsage(ApiProvider.ANTHROPIC).count).toBe(0);
      expect(service.getUsage(ApiProvider.GOOGLE_TRANSLATE).count).toBe(0);
      expect(service.getUsage(ApiProvider.YOUTUBE).count).toBe(0);
    });

    it('should allow usage again after reset', () => {
      for (let i = 0; i < 200; i++) {
        service.record(ApiProvider.ANTHROPIC);
      }

      expect(service.canUse(ApiProvider.ANTHROPIC)).toBe(false);

      service.resetDailyCounters();

      expect(service.canUse(ApiProvider.ANTHROPIC)).toBe(true);
      expect(service.getUsage(ApiProvider.ANTHROPIC).count).toBe(0);
    });
  });
});
