import { Body, Controller, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import { SocialLoginDto } from './dto/social-login.dto';
import { RefreshTokenDto } from "./dto/refresh-token.dto";

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
}
