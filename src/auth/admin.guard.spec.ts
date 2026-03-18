import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';

import { AdminGuard } from './admin.guard';

const MOCK_ADMIN_KEY = 'test-admin-api-key-12345';

function createMockExecutionContext(apiKey?: string): ExecutionContext {
  return {
    switchToHttp: () => ({
      getRequest: () => ({
        headers: {
          ...(apiKey !== undefined && { 'x-admin-api-key': apiKey }),
        },
      }),
    }),
  } as ExecutionContext;
}

describe('AdminGuard', () => {
  let guard: AdminGuard;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AdminGuard,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockReturnValue(MOCK_ADMIN_KEY),
          },
        },
      ],
    }).compile();

    guard = module.get<AdminGuard>(AdminGuard);
    configService = module.get<ConfigService>(ConfigService);
  });

  it('should allow request with valid API key', () => {
    const context = createMockExecutionContext(MOCK_ADMIN_KEY);

    expect(guard.canActivate(context)).toBe(true);
  });

  it('should throw UnauthorizedException with missing API key', () => {
    const context = createMockExecutionContext();

    expect(() => guard.canActivate(context)).toThrow(UnauthorizedException);
    expect(() => guard.canActivate(context)).toThrow('Invalid admin API key');
  });

  it('should throw UnauthorizedException with invalid API key', () => {
    const context = createMockExecutionContext('wrong-key-same-length!!');

    expect(() => guard.canActivate(context)).toThrow(UnauthorizedException);
  });

  it('should throw UnauthorizedException with wrong-length API key', () => {
    const context = createMockExecutionContext('short');

    expect(() => guard.canActivate(context)).toThrow(UnauthorizedException);
    expect(() => guard.canActivate(context)).toThrow('Invalid admin API key');
  });

  it('should throw UnauthorizedException when ADMIN_API_KEY is not configured', () => {
    jest.spyOn(configService, 'get').mockReturnValue(undefined);
    const context = createMockExecutionContext(MOCK_ADMIN_KEY);

    expect(() => guard.canActivate(context)).toThrow(UnauthorizedException);
    expect(() => guard.canActivate(context)).toThrow(
      'Admin API key is not configured',
    );
  });
});
