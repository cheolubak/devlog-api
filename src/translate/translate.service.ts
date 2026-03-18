import { TranslationServiceClient } from '@google-cloud/translate';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TranslateService implements OnModuleInit {
  private readonly logger = new Logger(TranslateService.name);
  private translationClient: null | TranslationServiceClient = null;
  private parent!: string;

  constructor(private readonly configService: ConfigService) {}

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

    const [response] = await this.translationClient.translateText({
      contents: [text],
      mimeType: 'text/plain',
      parent: this.parent,
      targetLanguageCode,
    });

    return response.translations?.[0]?.translatedText ?? null;
  }
}
