import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { authorization, sessionid } = request.headers;

    const accessToken = authorization.split(' ').at(1);

    if (!accessToken || !sessionid) {
      return false;
    }

    try {
      const user = await this.authService.validateAccessTokenUser(accessToken);

      if (!user) {
        return false;
      }

      request.user = user;

      return true;
    } catch {
      return false;
    }
  }
}
