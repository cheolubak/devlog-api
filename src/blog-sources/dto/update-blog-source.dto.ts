import { z } from 'zod';

import { feedTypeEnumSchema } from '../../common/schemas/feed-type.schema';
import { scrapingConfigSchema } from './scraping-config.dto';

export const updateBlogSourceSchema = z.object({
  isActive: z.boolean().optional(),
  name: z.string().max(100).optional(),
  scrapingConfig: scrapingConfigSchema.optional(),
  type: feedTypeEnumSchema.optional(),
  url: z.url().max(500).optional(),
});

export type UpdateBlogSourceDto = z.infer<typeof updateBlogSourceSchema>;
