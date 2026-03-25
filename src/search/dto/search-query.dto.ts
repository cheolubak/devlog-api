import { z } from 'zod';

import { feedTypeQuerySchema } from '../../common/schemas/feed-type.schema';
import { RegionType } from '../../database/generated/prisma/enums';

export const searchQuerySchema = z.object({
  limit: z.coerce.number().int().min(1).max(100).default(20),
  page: z.coerce.number().int().min(1).default(1),
  q: z.string().min(2),
  region: z.enum([RegionType.KOREA, RegionType.FOREIGN]).optional(),
  sourceId: z.string().optional(),
  type: feedTypeQuerySchema,
});

export type SearchQueryDto = z.infer<typeof searchQuerySchema>;
