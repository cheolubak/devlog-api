import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

import { Users } from '../database/generated/prisma/client';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { SocialLoginDto } from './dto/social-login.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: '카카오 소셜 로그인' })
  @Post('kakao')
  loginWithKakao(@Body() dto: SocialLoginDto) {
    return this.authService.loginWithKakao(dto);
  }

  @ApiOperation({ summary: '네이버 소셜 로그인' })
  @Post('naver')
  loginWithNaver(@Body() dto: SocialLoginDto) {
    return this.authService.loginWithNaver(dto);
  }

  @ApiOperation({ summary: '구글 소셜 로그인' })
  @Post('google')
  loginWithGoogle(@Body() dto: SocialLoginDto) {
    return this.authService.loginWithGoogle(dto);
  }

  @ApiOperation({ summary: '깃허브 소셜 로그인' })
  @Post('github')
  loginWithGithub(@Body() dto: SocialLoginDto) {
    return this.authService.loginWithGithub(dto);
  }

  @ApiOperation({ summary: '토큰 갱신' })
  @Post('refresh')
  refreshToken(@Body() dto: RefreshTokenDto) {
    return this.authService.refreshToken(dto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: '회원 탈퇴' })
  @Delete('leave')
  @UseGuards(AuthGuard)
  leave(@Req() req: Request & { user: Users }) {
    const user: Users = req.user;

    return this.authService.leave(user);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: '내 정보 조회' })
  @Get('me')
  @UseGuards(AuthGuard)
  getMe(@Req() req: Request & { user: Users }) {
    const user: Users = req.user;

    return {
      email: user.email,
      nickname: user.nickname,
      profile: user.profile,
      socialType: user.socialType,
    };
  }
}
