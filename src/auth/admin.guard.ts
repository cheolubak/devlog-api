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

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const apiKey = request.headers['x-admin-api-key'];

    const adminApiKey = this.configService.get<string>('ADMIN_API_KEY');

    if (!adminApiKey) {
      throw new UnauthorizedException('Admin API key is not configured');
    }

    if (!apiKey || typeof apiKey !== 'string') {
      throw new UnauthorizedException('Invalid admin API key');
    }

    const inputDigest = createHmac('sha256', 'admin-guard')
      .update(apiKey)
      .digest();
    const expectedDigest = createHmac('sha256', 'admin-guard')
      .update(adminApiKey)
      .digest();

    if (!timingSafeEqual(inputDigest, expectedDigest)) {
      throw new UnauthorizedException('Invalid admin API key');
    }

    return true;
  }
}
