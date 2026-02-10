import { Injectable, Logger } from '@nestjs/common';
import RssParser from 'rss-parser';
import { ParsedFeed } from './interfaces/feed-item.interface';

@Injectable()
export class FeedParserService {
  private readonly logger = new Logger(FeedParserService.name);
  private readonly parser: RssParser;

  constructor() {
    this.parser = new RssParser({
      timeout: 15000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; DevlogAPI/1.0)',
      },
    });
  }

  async parseFeed(url: string): Promise<ParsedFeed> {
    try {
      this.logger.log(`Parsing feed: ${url}`);
      const feed = await this.parser.parseURL(url);

      this.logger.log(`Successfully parsed feed: ${feed.title}, ${feed.items?.length || 0} items`);

      return {
        items: feed.items.map((item) => ({
          title: item.title || 'Untitled',
          link: item.link || '',
          pubDate: item.pubDate,
          creator: item.creator || item['dc:creator'] || item.author,
          content: item.content || item['content:encoded'] || '',
          contentSnippet: item.contentSnippet || '',
          categories: item.categories || [],
          guid: item.guid || item.id,
          isoDate: item.isoDate,
        })),
        title: feed.title,
        description: feed.description,
        link: feed.link,
      };
    } catch (error) {
      this.logger.error(`Failed to parse feed ${url}: ${error.message}`);
      throw error;
    }
  }
}
