import { ParsedFeed } from '../../src/feed-fetcher/interfaces/feed-item.interface';

export function createMockEmptyFeed(): ParsedFeed {
  return {
    description: 'An empty feed',
    items: [],
    link: 'https://example-blog.com',
    title: 'Empty Blog',
  };
}

export function createMockRssFeed(overrides?: Partial<ParsedFeed>): ParsedFeed {
  return {
    description: 'A test RSS feed',
    items: [
      {
        categories: ['javascript', 'nodejs'],
        content: '<p>First post content</p>',
        contentSnippet: 'First post content',
        creator: 'Author One',
        guid: 'guid-1',
        isoDate: '2025-01-15T10:00:00Z',
        link: 'https://example-blog.com/post-1',
        title: 'First Post',
      },
      {
        categories: ['typescript'],
        content: '<p>Second post content</p>',
        contentSnippet: 'Second post content',
        creator: 'Author Two',
        guid: 'guid-2',
        isoDate: '2025-01-14T10:00:00Z',
        link: 'https://example-blog.com/post-2',
        title: 'Second Post',
      },
    ],
    link: 'https://example-blog.com',
    title: 'Test Blog',
    ...overrides,
  };
}

export function createMockScrapingFeed(): ParsedFeed {
  return {
    items: [
      {
        content: 'Scraped post content',
        contentSnippet: 'Scraped post content',
        link: 'https://example-scrape.com/article-1',
        title: 'Scraped Article 1',
      },
      {
        content: 'Another scraped content',
        contentSnippet: 'Another scraped content',
        link: 'https://example-scrape.com/article-2',
        title: 'Scraped Article 2',
      },
    ],
    link: 'https://example-scrape.com/posts',
    title: 'Scraped Site',
  };
}

export function createMockYoutubeFetchResult() {
  return {
    channelId: 'UC_test_channel_id',
    feed: {
      description: 'YouTube channel videos',
      items: [
        {
          content: 'Video 1 description',
          contentSnippet: 'Video 1 description',
          creator: 'Test Channel',
          guid: 'video-id-1',
          isoDate: '2025-01-15T10:00:00Z',
          link: 'https://www.youtube.com/watch?v=video-id-1',
          title: 'YouTube Video 1',
        },
        {
          content: 'Video 2 description',
          contentSnippet: 'Video 2 description',
          creator: 'Test Channel',
          guid: 'video-id-2',
          isoDate: '2025-01-14T10:00:00Z',
          link: 'https://www.youtube.com/watch?v=video-id-2',
          title: 'YouTube Video 2',
        },
      ],
      link: 'https://youtube.com/@testchannel',
      title: 'Test Channel',
    } as ParsedFeed,
  };
}
