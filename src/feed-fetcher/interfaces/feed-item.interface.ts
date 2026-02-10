export interface FeedItem {
  title: string;
  link: string;
  pubDate?: string;
  creator?: string;
  content?: string;
  contentSnippet?: string;
  categories?: string[];
  guid?: string;
  isoDate?: string;
}

export interface ParsedFeed {
  items: FeedItem[];
  title?: string;
  description?: string;
  link?: string;
}
