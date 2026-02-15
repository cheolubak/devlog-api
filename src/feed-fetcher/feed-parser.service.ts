import { Injectable, Logger } from '@nestjs/common';
import * as RssParser from 'rss-parser';

import { ParsedFeed } from './interfaces/feed-item.interface';

@Injectable()
export class FeedParserService {
  private readonly logger = new Logger(FeedParserService.name);
  private readonly parser: RssParser;

  constructor() {
    this.parser = new RssParser({
      headers: {
        Accept:
          'application/rss+xml, application/atom+xml, application/xml,text/xml, */*',
        'Accept-Language': 'en-US,en;q=0.9,ko;q=0.8',
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
      timeout: 15000,
    });
  }

  async parseFeed(url: string): Promise<ParsedFeed> {
    try {
      const encodedUrl = encodeURI(url);
      this.logger.log(`Parsing feed: ${encodedUrl}`);
      const feed = await this.parser.parseURL(encodedUrl);

      this.logger.log(
        `Successfully parsed feed: ${feed.title}, ${feed.items?.length || 0} items`,
      );

      return {
        description: feed.description,
        items: feed.items.map((item) => ({
          categories: item.categories || [],
          content: item.content || item['content:encoded'] || '',
          contentSnippet: item.contentSnippet || '',
          creator: item.creator || item['dc:creator'] || item.author,
          guid: item.guid || item.id,
          isoDate: item.isoDate,
          link: item.link || '',
          pubDate: item.pubDate,
          title: item.title || 'Untitled',
        })),
        link: feed.link,
        title: feed.title,
      };
    } catch (error) {
      this.logger.error(`Failed to parse feed ${url}: ${error.message}`);
      throw error;
    }
  }
}
