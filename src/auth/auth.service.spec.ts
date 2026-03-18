import { HttpService } from '@nestjs/axios';
import { UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';

import { PrismaService } from '../database/prisma.service';
import { ImageParseService } from '../image-parse/image-parse.service';
import { AuthService } from './auth.service';

const mockPrisma = {
  $transaction: jest.fn(),
  users: {
    create: jest.fn(),
    delete: jest.fn(),
    findUnique: jest.fn(),
  },
};

const mockHttpService = {
  axiosRef: {
    get: jest.fn(),
  },
};

const mockImageParseService = {
  uploadImageAsWebp: jest.fn(),
};

const mockJwtService = {
  signAsync: jest.fn(),
  verifyAsync: jest.fn(),
};

const mockConfigService = {
  get: jest.fn().mockImplementation((key: string) => {
    if (key === 'JWT_SECRET') return 'test-jwt-secret';
    return undefined;
  }),
};

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: PrismaService, useValue: mockPrisma },
        { provide: HttpService, useValue: mockHttpService },
        { provide: ImageParseService, useValue: mockImageParseService },
        { provide: JwtService, useValue: mockJwtService },
        { provide: ConfigService, useValue: mockConfigService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jest.clearAllMocks();

    // Restore the default ConfigService mock after clearAllMocks
    mockConfigService.get.mockImplementation((key: string) => {
      if (key === 'JWT_SECRET') return 'test-jwt-secret';
      return undefined;
    });
  });

  describe('findUserById', () => {
    it('should return user when found', async () => {
      const mockUser = {
        createdAt: new Date(),
        email: 'test@example.com',
        id: 'user-1',
        nickname: 'TestUser',
        profile: null,
        socialId: 'social-1',
        socialType: 'KAKAO' as const,
        updatedAt: new Date(),
      };

      mockPrisma.users.findUnique.mockResolvedValue(mockUser);

      const result = await service.findUserById('user-1');

      expect(result).toEqual(mockUser);
      expect(mockPrisma.users.findUnique).toHaveBeenCalledWith({
        where: { id: 'user-1' },
      });
    });

    it('should return null when not found', async () => {
      mockPrisma.users.findUnique.mockResolvedValue(null);

      const result = await service.findUserById('non-existent');

      expect(result).toBeNull();
      expect(mockPrisma.users.findUnique).toHaveBeenCalledWith({
        where: { id: 'non-existent' },
      });
    });
  });

  describe('deriveRefreshSecret', () => {
    it('should produce consistent HMAC output for same inputs', () => {
      // Access private method via bracket notation for testing
      const result1 = (service as any).deriveRefreshSecret('session-123');
      const result2 = (service as any).deriveRefreshSecret('session-123');

      expect(result1).toBe(result2);
      expect(typeof result1).toBe('string');
      expect(result1.length).toBeGreaterThan(0);
    });

    it('should produce different output for different sessionIds', () => {
      const result1 = (service as any).deriveRefreshSecret('session-aaa');
      const result2 = (service as any).deriveRefreshSecret('session-bbb');

      expect(result1).not.toBe(result2);
    });

    it('should produce a hex-encoded string', () => {
      const result = (service as any).deriveRefreshSecret('session-test');

      expect(result).toMatch(/^[0-9a-f]+$/);
    });
  });

  describe('refreshToken', () => {
    it('should throw UnauthorizedException when user not found', async () => {
      mockJwtService.verifyAsync.mockResolvedValue({
        sub: 'non-existent-user',
      });
      mockPrisma.users.findUnique.mockResolvedValue(null);

      await expect(
        service.refreshToken({
          refreshToken: 'some-refresh-token',
          sessionId: 'session-1',
        }),
      ).rejects.toThrow(UnauthorizedException);

      await expect(
        service.refreshToken({
          refreshToken: 'some-refresh-token',
          sessionId: 'session-1',
        }),
      ).rejects.toThrow('User not found');
    });

    it('should return new tokens when user is found', async () => {
      const mockUser = {
        createdAt: new Date(),
        email: 'test@example.com',
        id: 'user-1',
        nickname: 'TestUser',
        profile: null,
        socialId: 'social-1',
        socialType: 'KAKAO' as const,
        updatedAt: new Date(),
      };

      mockJwtService.verifyAsync.mockResolvedValue({ sub: 'user-1' });
      mockPrisma.users.findUnique.mockResolvedValue(mockUser);
      mockJwtService.signAsync
        .mockResolvedValueOnce('new-access-token')
        .mockResolvedValueOnce('new-refresh-token');

      const result = await service.refreshToken({
        refreshToken: 'valid-refresh-token',
        sessionId: 'session-1',
      });

      expect(result).toEqual({
        accessToken: 'new-access-token',
        refreshToken: 'new-refresh-token',
      });
    });
  });

  describe('generateToken', () => {
    it('should return access and refresh tokens', async () => {
      mockJwtService.signAsync
        .mockResolvedValueOnce('access-token-123')
        .mockResolvedValueOnce('refresh-token-456');

      const result = await service.generateToken('user-1', 'session-1');

      expect(result).toEqual({
        accessToken: 'access-token-123',
        refreshToken: 'refresh-token-456',
      });
      expect(mockJwtService.signAsync).toHaveBeenCalledTimes(2);
      expect(mockJwtService.signAsync).toHaveBeenCalledWith({ sub: 'user-1' });
      expect(mockJwtService.signAsync).toHaveBeenCalledWith(
        { sub: 'user-1' },
        expect.objectContaining({
          expiresIn: '30d',
          secret: expect.any(String),
        }),
      );
    });
  });
});
