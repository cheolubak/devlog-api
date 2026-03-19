import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { authorization, sessionid } = request.headers;

    const accessToken = authorization?.split(' ').at(1);

    if (!accessToken) {
      throw new UnauthorizedException('Authorization header is required');
    }

    if (!sessionid) {
      throw new UnauthorizedException('sessionid header is required');
    }

    try {
      const user = await this.authService.validateAccessTokenUser(accessToken);

      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      request.user = user;

      return true;
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new UnauthorizedException('Access token is invalid or expired');
    }
  }
}
