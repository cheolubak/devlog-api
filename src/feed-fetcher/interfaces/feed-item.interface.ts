export interface FeedItem {
  categories?: string[];
  content?: string;
  contentSnippet?: string;
  creator?: string | { name: string[] } | unknown;
  guid?: string;
  isoDate?: string;
  link: string;
  pubDate?: string;
  title: string;
}

export interface ParsedFeed {
  description?: string;
  items: FeedItem[];
  link?: string;
  title?: string;
}
