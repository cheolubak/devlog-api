import {
  CanActivate,
  ExecutionContext,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { timingSafeEqual } from 'crypto';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const apiKey = request.headers['x-admin-api-key'];

    const adminApiKey = this.configService.get<string>('ADMIN_API_KEY');

    if (!adminApiKey) {
      throw new InternalServerErrorException();
    }

    const apiKeyBuf = Buffer.from(apiKey ?? '');
    const adminKeyBuf = Buffer.from(adminApiKey);
    if (
      apiKeyBuf.length !== adminKeyBuf.length ||
      !timingSafeEqual(apiKeyBuf, adminKeyBuf)
    ) {
      throw new UnauthorizedException();
    }

    return true;
  }
}
