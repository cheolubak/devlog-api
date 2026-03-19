import { z } from 'zod';

import { FeedType, RegionType } from '../../database/generated/prisma/enums';

export const searchQuerySchema = z.object({
  limit: z.coerce.number().int().min(1).max(100).default(20),
  offset: z.coerce.number().int().min(0).default(0),
  q: z.string().min(2),
  region: z.enum([RegionType.KOREA, RegionType.FOREIGN]).optional(),
  sourceId: z.string().optional(),
  type: z
    .union([
      z
        .enum([
          FeedType.RSS,
          FeedType.ATOM,
          FeedType.SCRAPING,
          FeedType.YOUTUBE,
        ])
        .transform((v) => [v]),
      z.array(
        z.enum([
          FeedType.RSS,
          FeedType.ATOM,
          FeedType.SCRAPING,
          FeedType.YOUTUBE,
        ]),
      ),
    ])
    .optional(),
});

export type SearchQueryDto = z.infer<typeof searchQuerySchema>;
