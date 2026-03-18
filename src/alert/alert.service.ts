import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { slackApi } from '../utils/slack';

@Injectable()
export class AlertService {
  private readonly slack = slackApi(this.configService.get('SLACK_TOKEN')!);
  private readonly slackChannelId: string =
    this.configService.get('SLACK_CHANNEL_ID') ?? '';

  constructor(private readonly configService: ConfigService) {}

  async sendAlert(message: string) {
    if (!this.slackChannelId) {
      return false;
    }

    await this.slack.chat.postMessage({
      channel: this.slackChannelId,
      text: message,
    });

    return true;
  }
}
