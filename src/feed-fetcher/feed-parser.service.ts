import { Injectable, Logger } from '@nestjs/common';
import { execFile } from 'child_process';
import * as crypto from 'crypto';
import * as https from 'https';
import * as RssParser from 'rss-parser';
import { promisify } from 'util';

import { getErrorMessage } from '../common/utils/error.util';
import { ParsedFeed } from './interfaces/feed-item.interface';
import { withRetry } from './utils/retry.util';

const execFileAsync = promisify(execFile);

@Injectable()
export class FeedParserService {
  private readonly logger = new Logger(FeedParserService.name);
  private readonly parser: RssParser;

  constructor() {
    const httpsAgent = new https.Agent({
      secureOptions: crypto.constants.SSL_OP_LEGACY_SERVER_CONNECT,
    });

    this.parser = new RssParser({
      headers: {
        Accept:
          'application/rss+xml, application/atom+xml, application/xml,text/xml, */*',
        'Accept-Language': 'en-US,en;q=0.9,ko;q=0.8',
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
      requestOptions: { agent: httpsAgent },
      timeout: 15000,
    });
  }

  async parseFeed(url: string): Promise<ParsedFeed> {
    try {
      const encodedUrl = encodeURI(url);
      const feed = await withRetry(() => this.parser.parseURL(encodedUrl), {
        baseDelayMs: 2000,
        maxRetries: 3,
      });

      return this.mapFeed(feed);
    } catch (error: unknown) {
      this.logger.warn(
        `rss-parser failed for ${url} (${getErrorMessage(error)}), trying curl fallback`,
      );
      return this.parseFeedWithCurl(url);
    }
  }

  private async parseFeedWithCurl(url: string): Promise<ParsedFeed> {
    try {
      const { stdout } = await execFileAsync(
        'curl',
        [
          '-sL',
          '--max-time',
          '15',
          '-H',
          'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          '-H',
          'Accept: application/rss+xml, application/xml, text/xml, */*',
          url,
        ],
        { maxBuffer: 10 * 1024 * 1024, timeout: 20000 },
      );

      const feed = await this.parser.parseString(stdout);
      this.logger.log(`curl fallback succeeded for ${url}`);
      return this.mapFeed(feed);
    } catch (error: unknown) {
      this.logger.error(
        `Failed to parse feed ${url}: ${getErrorMessage(error)}`,
      );
      throw error;
    }
  }

  private mapFeed(feed: RssParser.Output<{ [key: string]: unknown }>): ParsedFeed {
    return {
      description: feed.description,
      items: feed.items.map((item) => ({
        categories: item.categories || [],
        content: String(item.content || item['content:encoded'] || ''),
        contentSnippet: item.contentSnippet || '',
        creator:
          item.creator || (item['dc:creator'] as string) || item.author,
        guid: (item.guid || item.id) as string | undefined,
        isoDate: item.isoDate,
        link: item.link || '',
        pubDate: item.pubDate,
        title: item.title || 'Untitled',
      })),
      link: feed.link,
      title: feed.title,
    };
  }
}
