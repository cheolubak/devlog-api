import Anthropic from '@anthropic-ai/sdk';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import * as cheerio from 'cheerio';

import { FeedNormalizerUtil } from './utils/feed-normalizer.util';

@Injectable()
export class KeywordExtractorService {
  private readonly anthropic: Anthropic;
  private readonly logger = new Logger(KeywordExtractorService.name);

  constructor(private readonly configService: ConfigService) {
    this.anthropic = new Anthropic();
  }

  async isTechBlogPost(title: string, link: string): Promise<boolean> {
    try {
      const bodyText = await this.fetchPageText(link);

      if (!bodyText) {
        this.logger.warn(`No text extracted from ${link}, skipping tech check`);
        return false;
      }

      const truncatedText = FeedNormalizerUtil.truncateText(bodyText, 3000);

      const message = await this.anthropic.messages.create(
        {
          max_tokens: 10,
          messages: [
            {
              content: `제목: ${title}\n\n본문:\n${truncatedText}`,
              role: 'user',
            },
          ],
          model: 'claude-haiku-4-5-20251001',
          system:
            '주어진 블로그 포스트가 프로그래밍, 소프트웨어 개발, IT 기술 관련 글인지 판별하세요. "true" 또는 "false"만 반환하세요.',
        },
        {
          headers: {
            'X-Api-Key': this.configService.get('ANTHROPIC_API_KEY'),
          },
        },
      );

      const textBlock = message.content.find((block) => block.type === 'text');

      if (!textBlock || textBlock.type !== 'text') {
        return false;
      }

      return textBlock.text.trim().toLowerCase() === 'true';
    } catch (error) {
      this.logger.error(
        `Failed to determine tech blog for "${title}": ${error.message}`,
      );
      return false;
    }
  }

  async extractKeywords(
    title: string,
    sourceUrl: string,
  ): Promise<null | string> {
    try {
      const bodyText = await this.fetchPageText(sourceUrl);

      if (!bodyText) {
        this.logger.warn(`No text extracted from ${sourceUrl}`);
        return null;
      }

      const truncatedText = FeedNormalizerUtil.truncateText(bodyText, 3000);

      const message = await this.anthropic.messages.create(
        {
          max_tokens: 200,
          messages: [
            {
              content: `제목: ${title}\n\n본문:\n${truncatedText}`,
              role: 'user',
            },
          ],
          model: 'claude-haiku-4-5-20251001',
          system:
            '블로그 포스트의 제목과 본문을 분석하여 검색에 유용한 한국어 키워드를 폭 넓게 추출하세요. 콤마로 구분된 키워드만 반환하세요. 최대 50개',
        },
        {
          headers: {
            'X-Api-Key': this.configService.get('ANTHROPIC_API_KEY'),
          },
        },
      );

      const textBlock = message.content.find((block) => block.type === 'text');

      if (!textBlock || textBlock.type !== 'text') {
        return null;
      }

      return textBlock.text.trim();
    } catch (error) {
      this.logger.error(
        `Failed to extract keywords for "${title}": ${error.message}`,
      );
      return null;
    }
  }

  private async fetchPageText(url: string): Promise<null | string> {
    try {
      const response = await axios.get(url, {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (compatible; DevlogBot/1.0; +https://devlog.example.com)',
        },
        timeout: 10000,
      });

      const $ = cheerio.load(response.data);

      $('script, style, nav, header, footer, aside, noscript').remove();

      const bodyText =
        $('article').text() || $('main').text() || $('body').text();

      return bodyText.replace(/\s+/g, ' ').trim() || null;
    } catch (error) {
      this.logger.warn(`Failed to fetch page ${url}: ${error.message}`);
      return null;
    }
  }
}
