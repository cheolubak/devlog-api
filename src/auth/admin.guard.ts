import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createHmac, timingSafeEqual } from 'crypto';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {}

  static validateAdminKey(
    apiKey: string | string[] | undefined,
    adminApiKey: string | undefined,
  ): boolean {
    if (!adminApiKey || !apiKey || typeof apiKey !== 'string') {
      return false;
    }

    const inputDigest = createHmac('sha256', 'admin-guard')
      .update(apiKey)
      .digest();
    const expectedDigest = createHmac('sha256', 'admin-guard')
      .update(adminApiKey)
      .digest();

    return timingSafeEqual(inputDigest, expectedDigest);
  }

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const apiKey = request.headers['x-admin-api-key'];
    const adminApiKey = this.configService.get<string>('ADMIN_API_KEY');

    if (!adminApiKey) {
      throw new UnauthorizedException('Admin API key is not configured');
    }

    if (!AdminGuard.validateAdminKey(apiKey, adminApiKey)) {
      throw new UnauthorizedException('Invalid admin API key');
    }

    return true;
  }
}
