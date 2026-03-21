import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { WebClient } from '@slack/web-api';

@Injectable()
export class AlertService {
  private readonly logger = new Logger(AlertService.name);
  private readonly slack: null | WebClient;
  private readonly slackChannelId: string;

  constructor(private readonly configService: ConfigService) {
    const token = this.configService.get<string>('SLACK_TOKEN');
    this.slackChannelId = this.configService.get('SLACK_CHANNEL_ID') ?? '';

    if (token) {
      this.slack = new WebClient(token);
    } else {
      this.slack = null;
      this.logger.warn(
        'SLACK_TOKEN is not configured. Alert notifications will be disabled.',
      );
    }
  }

  async sendAlert(message: string) {
    if (!this.slack || !this.slackChannelId) {
      return false;
    }

    await this.slack.chat.postMessage({
      channel: this.slackChannelId,
      text: message,
    });

    return true;
  }
}
