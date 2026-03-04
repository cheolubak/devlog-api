import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';

import { Users } from '../database/generated/prisma';
import { PrismaService } from '../database/prisma.service';
import { ImageParseService } from '../image-parse/image-parse.service';
import { GithubUserDto } from './dto/github-user.dto';
import { GoogleUserDto } from './dto/google-user.dto';
import { KakaoUserDto } from './dto/kakao-user.dto';
import { NaverUserDto } from './dto/naver-user.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { SocialLoginDto } from './dto/social-login.dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly prismaService: PrismaService,
    private readonly httpService: HttpService,
    private readonly imageParseService: ImageParseService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async loginWithKakao({ accessToken, sessionId }: SocialLoginDto) {
    this.logger.log(`loginWithKakao: ${accessToken} ${sessionId}`);
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

    const findUser = await this.prismaService.users.findUnique({
      where: {
        socialId_socialType: {
          socialId: kakaoUser.id.toString(),
          socialType: 'KAKAO',
        },
      },
    });

    if (findUser) {
      return await this.generateToken(findUser.id, sessionId);
    }

    const profile = kakaoUser.kakao_account.profile.thumbnail_image_url
      ? await this.imageParseService.uploadImageAsWebp(
          kakaoUser.kakao_account.profile.thumbnail_image_url,
          `profile/${uuidv4()}`,
        )
      : null;

    const user = await this.prismaService.users.create({
      data: {
        email:
          kakaoUser.kakao_account.is_email_valid &&
          kakaoUser.kakao_account.is_email_verified
            ? kakaoUser.kakao_account.email
            : null,
        nickname: kakaoUser.kakao_account.profile.nickname,
        profile,
        socialId: kakaoUser.id.toString(),
        socialType: 'KAKAO',
      },
    });

    return await this.generateToken(user.id, sessionId);
  }

  async loginWithGoogle({ accessToken, sessionId }: SocialLoginDto) {
    this.logger.log(`loginWithGoogle: ${accessToken} ${sessionId}`);
    const googleUser = await this.httpService.axiosRef
      .get<GoogleUserDto>('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => res.data);

    const findUser = await this.prismaService.users.findUnique({
      where: {
        socialId_socialType: {
          socialId: googleUser.sub,
          socialType: 'GOOGLE',
        },
      },
    });

    if (findUser) {
      return await this.generateToken(findUser.id, sessionId);
    }

    const profile = googleUser.picture
      ? await this.imageParseService.uploadImageAsWebp(
          googleUser.picture,
          `profile/${uuidv4()}`,
        )
      : null;

    const user = await this.prismaService.users.create({
      data: {
        email: googleUser.email_verified ? googleUser.email : null,
        nickname: googleUser.name,
        profile,
        socialId: googleUser.sub,
        socialType: 'GOOGLE',
      },
    });

    return await this.generateToken(user.id, sessionId);
  }

  async loginWithGithub({ accessToken, sessionId }: SocialLoginDto) {
    this.logger.log(`loginWithGithub: ${accessToken} ${sessionId}`);
    const githubUser = await this.httpService.axiosRef
      .get<GithubUserDto>('https://api.github.com/user', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => res.data);

    const findUser = await this.prismaService.users.findUnique({
      where: {
        socialId_socialType: {
          socialId: githubUser.id.toString(),
          socialType: 'GITHUB',
        },
      },
    });

    if (findUser) {
      return await this.generateToken(findUser.id, sessionId);
    }

    const profile = githubUser.avatar_url
      ? await this.imageParseService.uploadImageAsWebp(
          githubUser.avatar_url,
          `profile/${uuidv4()}`,
        )
      : null;

    const user = await this.prismaService.users.create({
      data: {
        email: githubUser.email,
        nickname: githubUser.name,
        profile,
        socialId: githubUser.id.toString(),
        socialType: 'GITHUB',
      },
    });

    return await this.generateToken(user.id, sessionId);
  }

  async loginWithNaver({ accessToken, sessionId }: SocialLoginDto) {
    this.logger.log(`loginWithNaver: ${accessToken} ${sessionId}`);
    const naverUser = await this.httpService.axiosRef
      .get<NaverUserDto>('https://openapi.naver.com/v1/nid/me', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => res.data.response);

    const findUser = await this.prismaService.users.findUnique({
      where: {
        socialId_socialType: {
          socialId: naverUser.id,
          socialType: 'NAVER',
        },
      },
    });

    if (findUser) {
      return await this.generateToken(findUser.id, sessionId);
    }

    const profile = naverUser.profile_image
      ? await this.imageParseService.uploadImageAsWebp(
          naverUser.profile_image,
          `profile/${uuidv4()}`,
        )
      : null;

    const user = await this.prismaService.users.create({
      data: {
        email: naverUser.email,
        nickname: naverUser.nickname,
        profile,
        socialId: naverUser.id,
        socialType: 'NAVER',
      },
    });

    return await this.generateToken(user.id, sessionId);
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

    const refreshTokenSecret = this.configService.get('JWT_SECRET') + sessionId;

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
    const refreshTokenSecret = this.configService.get('JWT_SECRET') + sessionId;

    const payload: { sub: string } = await this.jwtService.verifyAsync(token, {
      secret: refreshTokenSecret,
    });

    return await this.findUserById(payload.sub);
  }

  async leave(user: Users) {
    await this.prismaService.users.delete({
      where: { id: user.id },
    });

    return { message: '완료' };
  }
}
