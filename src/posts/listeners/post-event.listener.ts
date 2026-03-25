import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { getErrorMessage } from '../../common/utils/error.util';
import { PrismaService } from '../../database/prisma.service';
import { KeywordExtractorService } from '../../feed-fetcher/keyword-extractor.service';
import { TranslateService } from '../../translate/translate.service';
import { POST_DISPLAY_UPDATED } from '../constants/post-events';
import { PostDisplayUpdatedEvent } from '../events/post-display-updated.event';

@Injectable()
export class PostEventListener {
  private readonly logger = new Logger(PostEventListener.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly keywordExtractorService: KeywordExtractorService,
    private readonly translateService: TranslateService,
  ) {}

  @OnEvent(POST_DISPLAY_UPDATED, { async: true })
  async handlePostDisplayUpdated(event: PostDisplayUpdatedEvent) {
    await Promise.allSettled([
      this.extractKeywords(event),
      this.translatePost(event),
    ]);
  }

  private async extractKeywords(event: PostDisplayUpdatedEvent) {
    if (!event.sourceUrl) return;

    try {
      const keywords = await this.keywordExtractorService.extractKeywords(
        event.title,
        event.sourceUrl,
      );
      if (keywords) {
        await this.prisma.postSearchKeywords.upsert({
          create: { keywords, postId: event.postId },
          update: { keywords },
          where: { postId: event.postId },
        });
      }
    } catch (error: unknown) {
      this.logger.error(
        `Keyword extraction failed for post ${event.postId}: ${getErrorMessage(error)}`,
      );
    }
  }

  private async translatePost(event: PostDisplayUpdatedEvent) {
    if (event.titleEn) return;

    try {
      const detectedLang = await this.translateService.detectLanguage(
        event.title,
      );
      if (!detectedLang) {
        this.logger.warn(
          `Language detection returned null for post ${event.postId}, skipping translation`,
        );
        return;
      }

      const isKorean = detectedLang === 'ko';

      const sourceDescription = event.description?.trim() || null;

      if (isKorean) {
        const titleEn = await this.translateService.translate(
          event.title,
          'en',
        );
        if (!titleEn) {
          this.logger.warn(
            `Title translation (ko→en) returned null for post ${event.postId}`,
          );
        }

        const descriptionEn = sourceDescription
          ? await this.translateService.translate(sourceDescription, 'en')
          : null;

        await this.prisma.posts.update({
          data: {
            descriptionEn: sourceDescription
              ? (descriptionEn ?? undefined)
              : null,
            ...(titleEn && { titleEn }),
          },
          where: { id: event.postId },
        });
      } else {
        const translatedTitle = await this.translateService.translate(
          event.title,
          'ko',
        );
        if (!translatedTitle) {
          this.logger.warn(
            `Title translation (→ko) returned null for post ${event.postId}`,
          );
        }

        const translatedDescription = sourceDescription
          ? await this.translateService.translate(sourceDescription, 'ko')
          : null;

        await this.prisma.posts.update({
          data: {
            description: sourceDescription
              ? (translatedDescription ?? undefined)
              : null,
            ...(translatedTitle && { title: translatedTitle }),
            descriptionEn: sourceDescription ? event.description : null,
            titleEn: event.title,
          },
          where: { id: event.postId },
        });
      }
    } catch (error: unknown) {
      this.logger.error(
        `Translation failed for post ${event.postId}: ${getErrorMessage(error)}`,
      );
    }
  }
}
