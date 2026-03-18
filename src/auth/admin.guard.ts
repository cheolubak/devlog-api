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

    if (
      !apiKey ||
      typeof apiKey !== 'string' ||
      apiKey.length !== adminApiKey.length ||
      !timingSafeEqual(Buffer.from(apiKey), Buffer.from(adminApiKey))
    ) {
      throw new UnauthorizedException('Invalid admin API key');
    }

    return true;
  }
}
