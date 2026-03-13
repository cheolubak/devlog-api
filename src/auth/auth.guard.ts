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

    if (!accessToken || !sessionid) {
      throw new UnauthorizedException();
    }

    try {
      const user = await this.authService.validateAccessTokenUser(accessToken);

      if (!user) {
        throw new UnauthorizedException();
      }

      request.user = user;

      return true;
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new UnauthorizedException();
    }
  }
}
