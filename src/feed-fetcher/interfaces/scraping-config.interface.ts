export interface ScrapingSelectors {
  author?: string;
  content?: string;
  date?: string;
  image?: string;
  link: string;
  tags?: string;
  title: string;
}

export interface ScrapingConfig {
  dateFormat?: string;
  listSelector: string;
  renderMode: 'static' | 'dynamic';
  selectors: ScrapingSelectors;
  waitFor?: number;
}
