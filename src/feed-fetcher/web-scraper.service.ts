import { HttpService } from '@nestjs/axios';
import { Injectable, Logger, OnModuleDestroy } from '@nestjs/common';
import * as cheerio from 'cheerio';
import puppeteer, { Browser } from 'puppeteer';
import { firstValueFrom } from 'rxjs';

import { FeedItem, ParsedFeed } from './interfaces/feed-item.interface';
import { ScrapingConfig } from './interfaces/scraping-config.interface';
import { withRetry } from './utils/retry.util';

type CheerioElement = ReturnType<CheerioRoot>[number];
type CheerioRoot = ReturnType<typeof cheerio.load>;

@Injectable()
export class WebScraperService implements OnModuleDestroy {
  private readonly logger = new Logger(WebScraperService.name);
  private browser: Browser | null = null;
  private pageCount = 0;
  private readonly MAX_PAGES_BEFORE_RESTART = 10;

  constructor(private readonly httpService: HttpService) {}

  async onModuleDestroy() {
    await this.closeBrowser();
  }

  async scrape(url: string, config: ScrapingConfig): Promise<ParsedFeed> {
    if (config.renderMode === 'dynamic') {
      return this.scrapeDynamic(url, config);
    }

    return this.scrapeStatic(url, config);
  }

  private async scrapeStatic(
    url: string,
    config: ScrapingConfig,
  ): Promise<ParsedFeed> {
    const html = await this.fetchHtml(url);
    return this.parseHtml(html, url, config);
  }

  private async scrapeDynamic(
    url: string,
    config: ScrapingConfig,
  ): Promise<ParsedFeed> {
    const html = await this.fetchHtmlWithPuppeteer(url, config.waitFor);
    return this.parseHtml(html, url, config);
  }

  private parseHtml(
    html: string,
    url: string,
    config: ScrapingConfig,
  ): ParsedFeed {
    const $ = cheerio.load(html);
    const baseUrl = new URL(url);
    const items: FeedItem[] = [];

    $(config.listSelector).each((_, element) => {
      try {
        const item = this.extractItem($, element, config, baseUrl);
        if (item && item.link && item.title) {
          items.push(item);
        }
      } catch (error: unknown) {
        this.logger.warn(`Failed to extract item: ${(error as Error).message}`);
      }
    });

    this.logger.log(`Scraped ${items.length} items from ${url}`);

    return {
      items,
      link: url,
      title: $('title').text() || url,
    };
  }

  private async getBrowser(): Promise<Browser> {
    if (!this.browser) {
      this.logger.log('Launching Puppeteer browser...');
      this.browser = await puppeteer.launch({
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-gpu',
        ],
        headless: true,
      });
    }
    return this.browser;
  }

  private async closeBrowser(): Promise<void> {
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
      this.logger.log('Puppeteer browser closed');
    }
  }

  private async fetchHtmlWithPuppeteer(
    url: string,
    waitFor?: number,
  ): Promise<string> {
    return withRetry(
      async () => {
        const browser = await this.getBrowser();
        const page = await browser.newPage();

        try {
          await page.setUserAgent(
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          );

          await page.setViewport({ height: 1080, width: 1920 });

          await page.setRequestInterception(true);
          page.on('request', (req) => {
            const blockedTypes = ['image', 'stylesheet', 'font', 'media'];
            if (blockedTypes.includes(req.resourceType())) {
              req.abort();
            } else {
              req.continue();
            }
          });

          await page.goto(url, {
            timeout: 60000,
            waitUntil: 'networkidle2',
          });

          if (waitFor && waitFor > 0) {
            await new Promise((resolve) => setTimeout(resolve, waitFor));
          }

          const html = await page.content();
          return html;
        } finally {
          await page.close();
          this.pageCount++;

          if (this.pageCount >= this.MAX_PAGES_BEFORE_RESTART) {
            this.logger.log(
              `Page count reached ${this.MAX_PAGES_BEFORE_RESTART}, restarting browser to free memory`,
            );
            await this.closeBrowser();
            this.pageCount = 0;
          }
        }
      },
      { baseDelayMs: 2000, maxRetries: 2 },
    );
  }

  private async fetchHtml(url: string): Promise<string> {
    return withRetry(
      async () => {
        const response = await firstValueFrom(
          this.httpService.get<string>(url, {
            headers: {
              Accept:
                'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
              'Accept-Language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
              'User-Agent':
                'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            },
            timeout: 30000,
          }),
        );
        return response.data;
      },
      { baseDelayMs: 1000, maxRetries: 3 },
    );
  }

  private extractItem(
    $: CheerioRoot,
    element: CheerioElement,
    config: ScrapingConfig,
    baseUrl: URL,
  ): FeedItem | null {
    const $el = $(element);
    const selectors = config.selectors;

    const title = this.extractText($el, selectors.title);
    const rawLink = this.extractLink($el, selectors.link);

    if (!title || !rawLink) {
      return null;
    }

    const link = this.resolveUrl(rawLink, baseUrl);
    const content = selectors.content
      ? this.extractText($el, selectors.content)
      : undefined;
    const dateStr = selectors.date
      ? this.extractText($el, selectors.date)
      : undefined;
    const author = selectors.author
      ? this.extractText($el, selectors.author)
      : undefined;
    const tags = selectors.tags
      ? this.extractTags($, $el, selectors.tags)
      : undefined;

    const item: FeedItem = {
      categories: tags,
      content: content,
      contentSnippet: content?.slice(0, 200),
      creator: author,
      link,
      title,
    };

    if (dateStr) {
      const parsedDate = this.parseDate(dateStr);
      if (parsedDate) {
        item.isoDate = parsedDate.toISOString();
      }
    }

    return item;
  }

  private extractText(
    $el: cheerio.Cheerio<CheerioElement>,
    selector: string,
  ): string {
    return $el.find(selector).first().text().trim();
  }

  private extractLink(
    $el: cheerio.Cheerio<CheerioElement>,
    selector: string,
  ): string {
    // If selector is empty, check if the element itself is a link
    if (!selector) {
      return $el.attr('href') || '';
    }
    const linkEl = $el.find(selector).first();
    return linkEl.attr('href') || linkEl.find('a').first().attr('href') || '';
  }

  private extractTags(
    $: CheerioRoot,
    $el: cheerio.Cheerio<CheerioElement>,
    selector: string,
  ): string[] {
    const tags: string[] = [];
    $el.find(selector).each((_, el) => {
      const tag = $(el).text().trim();
      if (tag) {
        tags.push(tag);
      }
    });
    return tags;
  }

  private resolveUrl(url: string, baseUrl: URL): string {
    if (!url) return '';
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }
    if (url.startsWith('//')) {
      return `${baseUrl.protocol}${url}`;
    }
    if (url.startsWith('/')) {
      return `${baseUrl.origin}${url}`;
    }
    return `${baseUrl.origin}/${url}`;
  }

  private parseDate(dateStr: string): Date | null {
    if (!dateStr) return null;

    // Try YYYY-MM-DD ISO format with overflow validation
    const isoPattern = /^(\d{4})-(\d{2})-(\d{2})/;
    const isoMatch = dateStr.match(isoPattern);
    if (isoMatch) {
      const y = Number(isoMatch[1]);
      const m = Number(isoMatch[2]);
      const d = Number(isoMatch[3]);
      const parsed = new Date(dateStr);
      if (
        isNaN(parsed.getTime()) ||
        parsed.getUTCFullYear() !== y ||
        parsed.getUTCMonth() !== m - 1 ||
        parsed.getUTCDate() !== d
      ) {
        return null;
      }
      return parsed;
    }

    // Try other date formats
    const isoDate = new Date(dateStr);
    if (!isNaN(isoDate.getTime())) {
      return isoDate;
    }

    // Korean date formats
    const koreanPatterns = [
      /(\d{4})년\s*(\d{1,2})월\s*(\d{1,2})일/,
      /(\d{4})\.(\d{1,2})\.(\d{1,2})/,
      /(\d{4})-(\d{1,2})-(\d{1,2})/,
      /(\d{4})\/(\d{1,2})\/(\d{1,2})/,
    ];

    for (const pattern of koreanPatterns) {
      const match = dateStr.match(pattern);
      if (match) {
        const [, year, month, day] = match;
        const y = Number(year);
        const m = Number(month);
        const d = Number(day);
        const parsed = new Date(y, m - 1, d);
        if (
          parsed.getFullYear() !== y ||
          parsed.getMonth() !== m - 1 ||
          parsed.getDate() !== d
        ) {
          return null;
        }
        return parsed;
      }
    }

    return null;
  }
}
