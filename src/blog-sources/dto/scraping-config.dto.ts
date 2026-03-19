import { z } from 'zod';

export const scrapingSelectorsSchema = z.object({
  author: z.string().optional(),
  content: z.string().optional(),
  date: z.string().optional(),
  image: z.string().optional(),
  link: z.string().min(1),
  tags: z.string().optional(),
  title: z.string().min(1),
});

export type ScrapingSelectorsDto = z.infer<typeof scrapingSelectorsSchema>;

export const scrapingConfigSchema = z.object({
  dateFormat: z.string().optional(),
  listSelector: z.string().min(1),
  renderMode: z.enum(['static', 'dynamic']),
  selectors: scrapingSelectorsSchema,
  waitFor: z.int().min(0).optional(),
});

export type ScrapingConfigDto = z.infer<typeof scrapingConfigSchema>;
