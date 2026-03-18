import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';

import { PrismaService } from '../../database/prisma.service';
import { ViewHistoryCleanupService } from './view-history-cleanup.service';

const mockPrisma = {
  postViewHistory: {
    deleteMany: jest.fn(),
  },
};

const mockConfigService = {
  get: jest.fn(),
};

describe('ViewHistoryCleanupService', () => {
  let service: ViewHistoryCleanupService;

  beforeEach(async () => {
    mockConfigService.get.mockReturnValue(undefined);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ViewHistoryCleanupService,
        { provide: PrismaService, useValue: mockPrisma },
        { provide: ConfigService, useValue: mockConfigService },
      ],
    }).compile();

    service = module.get<ViewHistoryCleanupService>(ViewHistoryCleanupService);
    jest.clearAllMocks();
  });

  describe('cleanup', () => {
    it('should delete records older than default 90 days', async () => {
      mockPrisma.postViewHistory.deleteMany.mockResolvedValue({ count: 5 });

      const beforeCleanup = new Date();
      await service.cleanup();

      expect(mockPrisma.postViewHistory.deleteMany).toHaveBeenCalledTimes(1);

      const callArgs = mockPrisma.postViewHistory.deleteMany.mock.calls[0][0];
      const cutoffDate = callArgs.where.createdAt.lt as Date;

      const expectedCutoff = new Date(beforeCleanup);
      expectedCutoff.setDate(expectedCutoff.getDate() - 90);

      const diffMs = Math.abs(cutoffDate.getTime() - expectedCutoff.getTime());
      expect(diffMs).toBeLessThan(1000);
    });

    it('should use configurable retention days', async () => {
      mockConfigService.get.mockReturnValue(30);

      const module: TestingModule = await Test.createTestingModule({
        providers: [
          ViewHistoryCleanupService,
          { provide: PrismaService, useValue: mockPrisma },
          { provide: ConfigService, useValue: mockConfigService },
        ],
      }).compile();

      const customService = module.get<ViewHistoryCleanupService>(
        ViewHistoryCleanupService,
      );

      mockPrisma.postViewHistory.deleteMany.mockResolvedValue({ count: 3 });

      const beforeCleanup = new Date();
      await customService.cleanup();

      const callArgs = mockPrisma.postViewHistory.deleteMany.mock.calls[0][0];
      const cutoffDate = callArgs.where.createdAt.lt as Date;

      const expectedCutoff = new Date(beforeCleanup);
      expectedCutoff.setDate(expectedCutoff.getDate() - 30);

      const diffMs = Math.abs(cutoffDate.getTime() - expectedCutoff.getTime());
      expect(diffMs).toBeLessThan(1000);
    });

    it('should handle errors gracefully', async () => {
      jest.spyOn(Logger.prototype, 'error').mockImplementation();

      mockPrisma.postViewHistory.deleteMany.mockRejectedValue(
        new Error('Database connection lost'),
      );

      await expect(service.cleanup()).resolves.toBeUndefined();

      jest.restoreAllMocks();
    });

    it('should not log when no records are deleted', async () => {
      mockPrisma.postViewHistory.deleteMany.mockResolvedValue({ count: 0 });

      await service.cleanup();

      expect(mockPrisma.postViewHistory.deleteMany).toHaveBeenCalledTimes(1);
    });
  });
});
