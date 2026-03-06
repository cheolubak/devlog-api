import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { Users } from '../database/generated/prisma';
import { slackApi } from '../utils/slack';
import { RequestDto } from './dto/request.dto';

@Injectable()
export class RequestService {
  private readonly slack = slackApi(this.configService.get('SLACK_TOKEN'));
  private readonly slackChannelId: string;

  constructor(private readonly configService: ConfigService) {
    this.slackChannelId =
      this.configService.get('SLACK_CHANNEL_ID') || 'C0AJAMVQ135';
  }

  async requestBlogs({ dto, user }: { dto: RequestDto; user?: Users }) {
    await this.slack.chat.postMessage({
      channel: this.slackChannelId,
      text: `블로그 포스 요청 : ${dto.url} | 요청 이메일 : ${dto.email} | 사용자 ID : ${user?.id ?? 'UNKNOWN'}`,
    });

    return true;
  }

  async requestYoutubes({ dto, user }: { dto: RequestDto; user?: Users }) {
    await this.slack.chat.postMessage({
      channel: this.slackChannelId,
      text: `유튜브 채널 요청 : ${dto.url} | 요청 이메일 : ${dto.email} | 사용자 ID : ${user?.id ?? 'UNKNOWN'}`,
    });

    return true;
  }
}
