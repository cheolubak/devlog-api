import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { createHmac } from 'crypto';
import { v4 as uuidv4 } from 'uuid';

import { SocialType, Users } from '../database/generated/prisma/client';
import { PrismaService } from '../database/prisma.service';
import { ImageParseService } from '../image-parse/image-parse.service';
import { GithubUserDto } from './dto/github-user.dto';
import { GoogleUserDto } from './dto/google-user.dto';
import { KakaoUserDto } from './dto/kakao-user.dto';
import { NaverUserDto } from './dto/naver-user.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { SocialLoginDto } from './dto/social-login.dto';

interface SocialUserData {
  email: null | string;
  nickname: string;
  profileImageUrl: null | string;
  socialId: string;
  socialType: SocialType;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly httpService: HttpService,
    private readonly imageParseService: ImageParseService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async loginWithKakao({ accessToken, sessionId }: SocialLoginDto) {
    const userData = await this.fetchKakaoUser(accessToken);
    return this.socialLogin(userData, sessionId);
  }

  async loginWithGoogle({ accessToken, sessionId }: SocialLoginDto) {
    const userData = await this.fetchGoogleUser(accessToken);
    return this.socialLogin(userData, sessionId);
  }

  async loginWithGithub({ accessToken, sessionId }: SocialLoginDto) {
    const userData = await this.fetchGithubUser(accessToken);
    return this.socialLogin(userData, sessionId);
  }

  async loginWithNaver({ accessToken, sessionId }: SocialLoginDto) {
    const userData = await this.fetchNaverUser(accessToken);
    return this.socialLogin(userData, sessionId);
  }

  async refreshToken({ refreshToken, sessionId }: RefreshTokenDto) {
    const user = await this.validateRefreshTokenUser(refreshToken, sessionId);

    return await this.generateToken(user.id, sessionId);
  }

  async findUserById(id: string) {
    return this.prismaService.users.findUnique({
      where: { id },
    });
  }

  async generateToken(userId: string, sessionId: string) {
    const payload = { sub: userId };

    const refreshTokenSecret = this.deriveRefreshSecret(sessionId);

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload),
      this.jwtService.signAsync(payload, {
        expiresIn: '30d',
        secret: refreshTokenSecret,
      }),
    ]);

    return { accessToken, refreshToken };
  }

  async validateAccessTokenUser(token: string) {
    const payload: { sub: string } = await this.jwtService.verifyAsync(token);

    return await this.findUserById(payload.sub);
  }

  async validateRefreshTokenUser(token: string, sessionId: string) {
    const refreshTokenSecret = this.deriveRefreshSecret(sessionId);

    const payload: { sub: string } = await this.jwtService.verifyAsync(token, {
      secret: refreshTokenSecret,
    });

    return await this.findUserById(payload.sub);
  }

  async leave(user: Users) {
    await this.prismaService.$transaction(async (tx) => {
      await Promise.all([
        tx.postViewHistory.deleteMany({
          where: { userId: user.id },
        }),
        tx.postBookmarks.deleteMany({
          where: { userId: user.id },
        }),
      ]);
      await tx.users.delete({
        where: { id: user.id },
      });
    });

    return { message: '완료' };
  }

  private deriveRefreshSecret(sessionId: string): string {
    const jwtSecret = this.configService.get<string>('JWT_SECRET');
    return createHmac('sha256', jwtSecret).update(sessionId).digest('hex');
  }

  private async socialLogin(userData: SocialUserData, sessionId: string) {
    const findUser = await this.prismaService.users.findUnique({
      where: {
        socialId_socialType: {
          socialId: userData.socialId,
          socialType: userData.socialType,
        },
      },
    });

    if (findUser) {
      return await this.generateToken(findUser.id, sessionId);
    }

    const profile = userData.profileImageUrl
      ? await this.imageParseService.uploadImageAsWebp(
          userData.profileImageUrl,
          `profile/${uuidv4()}`,
        )
      : null;

    const user = await this.prismaService.users.create({
      data: {
        email: userData.email,
        nickname: userData.nickname,
        profile,
        socialId: userData.socialId,
        socialType: userData.socialType,
      },
    });

    return await this.generateToken(user.id, sessionId);
  }

  private async fetchKakaoUser(accessToken: string): Promise<SocialUserData> {
    const kakaoUser = await this.httpService.axiosRef
      .get<KakaoUserDto>(`https://kapi.kakao.com/v2/user/me`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
        params: {
          property_keys: [
            'kakao_account.email',
            'kakao_account.name',
            'kakao_account.profile',
          ],
          secure_resource: true,
        },
      })
      .then((res) => res.data);

    return {
      email:
        kakaoUser.kakao_account.is_email_valid &&
        kakaoUser.kakao_account.is_email_verified
          ? kakaoUser.kakao_account.email
          : null,
      nickname: kakaoUser.kakao_account.profile.nickname,
      profileImageUrl:
        kakaoUser.kakao_account.profile.thumbnail_image_url || null,
      socialId: kakaoUser.id.toString(),
      socialType: 'KAKAO',
    };
  }

  private async fetchGoogleUser(accessToken: string): Promise<SocialUserData> {
    const googleUser = await this.httpService.axiosRef
      .get<GoogleUserDto>('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => res.data);

    return {
      email: googleUser.email_verified ? googleUser.email : null,
      nickname: googleUser.name,
      profileImageUrl: googleUser.picture || null,
      socialId: googleUser.sub,
      socialType: 'GOOGLE',
    };
  }

  private async fetchGithubUser(accessToken: string): Promise<SocialUserData> {
    const githubUser = await this.httpService.axiosRef
      .get<GithubUserDto>('https://api.github.com/user', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => res.data);

    return {
      email: githubUser.email,
      nickname: githubUser.name,
      profileImageUrl: githubUser.avatar_url || null,
      socialId: githubUser.id.toString(),
      socialType: 'GITHUB',
    };
  }

  private async fetchNaverUser(accessToken: string): Promise<SocialUserData> {
    const naverUser = await this.httpService.axiosRef
      .get<NaverUserDto>('https://openapi.naver.com/v1/nid/me', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => res.data.response);

    return {
      email: naverUser.email,
      nickname: naverUser.nickname,
      profileImageUrl: naverUser.profile_image || null,
      socialId: naverUser.id,
      socialType: 'NAVER',
    };
  }
}
