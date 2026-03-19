import { z } from 'zod';

import { feedTypeEnumSchema } from '../../common/schemas/feed-type.schema';
import { RegionType } from '../../database/generated/prisma/enums';
import { scrapingConfigSchema } from './scraping-config.dto';

export const createBlogSourceObjectSchema = z.object({
  blogUrl: z.url().max(500),
  icon: z.string().optional(),
  name: z.string().min(1).max(100),
  region: z.enum([RegionType.KOREA, RegionType.FOREIGN]),
  scrapingConfig: scrapingConfigSchema.optional(),
  type: feedTypeEnumSchema,
  url: z.url().max(500),
});

export const createBlogSourceSchema = createBlogSourceObjectSchema.refine(
  (data) => data.type !== 'SCRAPING' || data.scrapingConfig !== undefined,
  {
    message: 'scrapingConfig is required when type is SCRAPING',
    path: ['scrapingConfig'],
  },
);

export type CreateBlogSourceDto = z.infer<typeof createBlogSourceSchema>;
