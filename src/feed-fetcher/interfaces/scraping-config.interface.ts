export interface ScrapingConfig {
  dateFormat?: string;
  listSelector: string;
  renderMode: 'dynamic' | 'static';
  selectors: ScrapingSelectors;
  waitFor?: number;
}

export interface ScrapingSelectors {
  author?: string;
  content?: string;
  date?: string;
  image?: string;
  link: string;
  tags?: string;
  title: string;
}
