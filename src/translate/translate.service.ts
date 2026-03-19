import { TranslationServiceClient } from '@google-cloud/translate';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import {
  ApiProvider,
  ApiUsageService,
} from '../common/services/api-usage.service';

@Injectable()
export class TranslateService implements OnModuleInit {
  private readonly logger = new Logger(TranslateService.name);
  private translationClient: null | TranslationServiceClient = null;
  private parent!: string;

  constructor(
    private readonly apiUsageService: ApiUsageService,
    private readonly configService: ConfigService,
  ) {}

  onModuleInit() {
    const projectId = this.configService.get<string>('GOOGLE_CLOUD_PROJECT_ID');
    const credentialsJson = this.configService.get<string>(
      'GOOGLE_CLOUD_CREDENTIALS',
    );

    if (!projectId) {
      this.logger.warn(
        'GOOGLE_CLOUD_PROJECT_ID is not set. Translation will be skipped.',
      );
      return;
    }

    this.parent = `projects/${projectId}/locations/global`;

    const clientOptions: ConstructorParameters<
      typeof TranslationServiceClient
    >[0] = { projectId };

    if (credentialsJson) {
      try {
        clientOptions.credentials = JSON.parse(credentialsJson);
      } catch {
        this.logger.error(
          'Failed to parse GOOGLE_CLOUD_CREDENTIALS JSON. Translation will be skipped.',
        );
        return;
      }
    }

    this.translationClient = new TranslationServiceClient(clientOptions);
    this.logger.log('Google Translation client initialized');
  }

  async detectLanguage(text: string): Promise<null | string> {
    if (!this.translationClient) {
      this.logger.warn(
        'Translation client is not initialized. Skipping detection.',
      );
      return null;
    }

    if (!text.trim()) {
      return null;
    }

    if (!this.apiUsageService.tryConsume(ApiProvider.GOOGLE_TRANSLATE)) {
      const usage = this.apiUsageService.getUsage(ApiProvider.GOOGLE_TRANSLATE);
      this.logger.warn(
        `Google Translate API daily limit reached (${usage.count}/${usage.limit}), skipping detection`,
      );
      return null;
    }

    const [response] = await this.translationClient.detectLanguage({
      content: text,
      mimeType: 'text/plain',
      parent: this.parent,
    });

    return response.languages?.[0]?.languageCode ?? null;
  }

  async translate(
    text: string,
    targetLanguageCode: string,
  ): Promise<null | string> {
    if (!this.translationClient) {
      this.logger.warn(
        'Translation client is not initialized. Skipping translation.',
      );
      return null;
    }

    if (!this.apiUsageService.tryConsume(ApiProvider.GOOGLE_TRANSLATE)) {
      const usage = this.apiUsageService.getUsage(ApiProvider.GOOGLE_TRANSLATE);
      this.logger.warn(
        `Google Translate API daily limit reached (${usage.count}/${usage.limit}), skipping translation`,
      );
      return null;
    }

    const [response] = await this.translationClient.translateText({
      contents: [text],
      mimeType: 'text/plain',
      parent: this.parent,
      targetLanguageCode,
    });

    return response.translations?.[0]?.translatedText ?? null;
  }
}
