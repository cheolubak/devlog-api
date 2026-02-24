import { FeedType } from '../../src/database/generated/prisma';

export function createAtomBlogSourceDto(overrides?: Record<string, any>) {
  return {
    blogUrl: 'https://example-atom.com',
    name: 'Test Atom Blog',
    type: FeedType.ATOM,
    url: 'https://example-atom.com/atom.xml',
    ...overrides,
  };
}

export function createRssBlogSourceDto(overrides?: Record<string, any>) {
  return {
    blogUrl: 'https://example-blog.com',
    name: 'Test RSS Blog',
    type: FeedType.RSS,
    url: 'https://example-blog.com/rss',
    ...overrides,
  };
}

export function createScrapingBlogSourceDto(overrides?: Record<string, any>) {
  return {
    blogUrl: 'https://example-scrape.com',
    name: 'Test Scraping Blog',
    scrapingConfig: {
      listSelector: '.post-item',
      renderMode: 'static',
      selectors: {
        link: 'a',
        title: '.title',
      },
    },
    type: FeedType.SCRAPING,
    url: 'https://example-scrape.com/posts',
    ...overrides,
  };
}

export function createYoutubeBlogSourceDto(overrides?: Record<string, any>) {
  return {
    blogUrl: 'https://youtube.com/@testchannel',
    name: 'Test YouTube Channel',
    type: FeedType.YOUTUBE,
    url: 'https://youtube.com/@testchannel',
    ...overrides,
  };
}
