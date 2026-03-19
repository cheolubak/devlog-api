import { z } from 'zod';

import { FeedType, RegionType } from '../../database/generated/prisma/enums';

export const postQuerySchema = z.object({
  ids: z
    .union([z.string().transform((v) => v.split(',')), z.array(z.string())])
    .optional(),
  isDisplay: z
    .union([z.boolean(), z.string().transform((v) => v === 'true')])
    .optional(),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  offset: z.coerce.number().int().min(0).default(0),
  region: z.enum([RegionType.KOREA, RegionType.FOREIGN]).optional(),
  sourceId: z.uuid().optional(),
  tag: z.string().optional(),
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

export type PostQueryDto = z.infer<typeof postQuerySchema>;
