export interface FeedItem {
  categories?: string[];
  content?: string;
  contentSnippet?: string;
  creator?: string | unknown | { name: string[] };
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
