import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';

import { PrismaService } from '../../database/prisma.service';
import { ApiProvider, ApiUsageService } from './api-usage.service';

describe('ApiUsageService', () => {
  let service: ApiUsageService;

  const mockPrisma = {
    apiDailyUsage: {
      findMany: jest.fn().mockResolvedValue([]),
      upsert: jest.fn().mockResolvedValue({}),
    },
  };

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
        {
          provide: PrismaService,
          useValue: mockPrisma,
        },
      ],
    }).compile();

    service = module.get<ApiUsageService>(ApiUsageService);
    jest.clearAllMocks();
  });

  describe('tryConsume', () => {
    it('should return true and increment when under limit', async () => {
      expect(await service.tryConsume(ApiProvider.ANTHROPIC)).toBe(true);
      expect(service.getUsage(ApiProvider.ANTHROPIC).count).toBe(1);
    });

    it('should persist usage to database', async () => {
      await service.tryConsume(ApiProvider.ANTHROPIC);

      expect(mockPrisma.apiDailyUsage.upsert).toHaveBeenCalledWith(
        expect.objectContaining({
          update: { count: 1 },
          where: expect.objectContaining({
            provider_date: expect.objectContaining({
              provider: 'ANTHROPIC',
            }),
          }),
        }),
      );
    });

    it('should return false when at limit', async () => {
      for (let i = 0; i < 200; i++) {
        await service.tryConsume(ApiProvider.ANTHROPIC);
      }

      expect(await service.tryConsume(ApiProvider.ANTHROPIC)).toBe(false);
      expect(service.getUsage(ApiProvider.ANTHROPIC).count).toBe(200);
    });

    it('should return false when amount would exceed limit', async () => {
      for (let i = 0; i < 199; i++) {
        await service.tryConsume(ApiProvider.ANTHROPIC);
      }

      expect(await service.tryConsume(ApiProvider.ANTHROPIC, 2)).toBe(false);
      expect(service.getUsage(ApiProvider.ANTHROPIC).count).toBe(199);
    });

    it('should track each provider independently', async () => {
      for (let i = 0; i < 200; i++) {
        await service.tryConsume(ApiProvider.ANTHROPIC);
      }

      expect(await service.tryConsume(ApiProvider.ANTHROPIC)).toBe(false);
      expect(await service.tryConsume(ApiProvider.GOOGLE_TRANSLATE)).toBe(true);
      expect(await service.tryConsume(ApiProvider.YOUTUBE)).toBe(true);
    });

    it('should still succeed even if DB persistence fails', async () => {
      mockPrisma.apiDailyUsage.upsert.mockRejectedValueOnce(
        new Error('DB error'),
      );

      expect(await service.tryConsume(ApiProvider.ANTHROPIC)).toBe(true);
      expect(service.getUsage(ApiProvider.ANTHROPIC).count).toBe(1);
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

    it('should return updated count after consuming', async () => {
      await service.tryConsume(ApiProvider.GOOGLE_TRANSLATE);
      await service.tryConsume(ApiProvider.GOOGLE_TRANSLATE);
      await service.tryConsume(ApiProvider.GOOGLE_TRANSLATE);

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
    it('should clear all counters', async () => {
      await service.tryConsume(ApiProvider.ANTHROPIC);
      await service.tryConsume(ApiProvider.GOOGLE_TRANSLATE);
      await service.tryConsume(ApiProvider.YOUTUBE);

      expect(service.getUsage(ApiProvider.ANTHROPIC).count).toBe(1);
      expect(service.getUsage(ApiProvider.GOOGLE_TRANSLATE).count).toBe(1);
      expect(service.getUsage(ApiProvider.YOUTUBE).count).toBe(1);

      service.resetDailyCounters();

      expect(service.getUsage(ApiProvider.ANTHROPIC).count).toBe(0);
      expect(service.getUsage(ApiProvider.GOOGLE_TRANSLATE).count).toBe(0);
      expect(service.getUsage(ApiProvider.YOUTUBE).count).toBe(0);
    });

    it('should allow usage again after reset', async () => {
      for (let i = 0; i < 200; i++) {
        await service.tryConsume(ApiProvider.ANTHROPIC);
      }

      expect(await service.tryConsume(ApiProvider.ANTHROPIC)).toBe(false);

      service.resetDailyCounters();

      expect(await service.tryConsume(ApiProvider.ANTHROPIC)).toBe(true);
      expect(service.getUsage(ApiProvider.ANTHROPIC).count).toBe(1);
    });
  });

  describe('onModuleInit', () => {
    it('should load today counters from DB', async () => {
      const today = new Date();
      const dateOnly = new Date(
        Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()),
      );

      mockPrisma.apiDailyUsage.findMany.mockResolvedValueOnce([
        { count: 50, date: dateOnly, provider: 'ANTHROPIC' },
        { count: 100, date: dateOnly, provider: 'GOOGLE_TRANSLATE' },
      ]);

      await service.onModuleInit();

      expect(service.getUsage(ApiProvider.ANTHROPIC).count).toBe(50);
      expect(service.getUsage(ApiProvider.GOOGLE_TRANSLATE).count).toBe(100);
      expect(service.getUsage(ApiProvider.YOUTUBE).count).toBe(0);
    });
  });
});
