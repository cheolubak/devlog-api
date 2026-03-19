import { z } from 'zod';

import { FeedType } from '../../database/generated/prisma/enums';

export const feedTypeEnumSchema = z.enum([
  FeedType.RSS,
  FeedType.ATOM,
  FeedType.SCRAPING,
  FeedType.YOUTUBE,
]);

export const feedTypeQuerySchema = z
  .union([
    feedTypeEnumSchema.transform((v) => [v]),
    z.array(feedTypeEnumSchema),
  ])
  .optional();
