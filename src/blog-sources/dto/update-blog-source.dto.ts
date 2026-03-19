import { z } from 'zod';

import { FeedType } from '../../database/generated/prisma/enums';

export const updateBlogSourceSchema = z.object({
  isActive: z.boolean().optional(),
  name: z.string().max(100).optional(),
  type: z
    .enum([FeedType.RSS, FeedType.ATOM, FeedType.SCRAPING, FeedType.YOUTUBE])
    .optional(),
  url: z.url().max(500).optional(),
});

export type UpdateBlogSourceDto = z.infer<typeof updateBlogSourceSchema>;
