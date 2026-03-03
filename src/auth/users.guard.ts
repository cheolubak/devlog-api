import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

import { AuthService } from './auth.service';

@Injectable()
export class UsersGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { authorization, sessionid } = request.headers;

    const accessToken = authorization?.split(' ').at(1);

    if (!accessToken || !sessionid) {
      return true;
    }

    try {
      const user = await this.authService.validateAccessTokenUser(accessToken);

      if (user) {
        request.user = user;
      }

      return true;
    } catch {
      return true;
    }
  }
}
