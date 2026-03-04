import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';

import { Users } from '../database/generated/prisma';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { SocialLoginDto } from './dto/social-login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('kakao')
  loginWithKakao(@Body() dto: SocialLoginDto) {
    return this.authService.loginWithKakao(dto);
  }

  @Post('naver')
  loginWithNaver(@Body() dto: SocialLoginDto) {
    return this.authService.loginWithNaver(dto);
  }

  @Post('google')
  loginWithGoogle(@Body() dto: SocialLoginDto) {
    return this.authService.loginWithGoogle(dto);
  }

  @Post('github')
  loginWithGithub(@Body() dto: SocialLoginDto) {
    return this.authService.loginWithGithub(dto);
  }

  @Post('refresh')
  refreshToken(@Body() dto: RefreshTokenDto) {
    return this.authService.refreshToken(dto);
  }

  @Get('me')
  @UseGuards(AuthGuard)
  getMe(@Req() req) {
    const user: Users = req.user;

    return {
      email: user.email,
      nickname: user.nickname,
      profile: user.profile,
      socialType: user.socialType,
    };
  }
}
