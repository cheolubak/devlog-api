import { z } from 'zod';

import { feedTypeQuerySchema } from '../../common/schemas/feed-type.schema';
import { RegionType } from '../../database/generated/prisma/enums';

export const postQuerySchema = z.object({
  ids: z
    .union([
      z.string().transform((v) => v.split(',').map((s) => s.trim())),
      z.array(z.string()),
    ])
    .optional(),
  isDisplay: z
    .enum(['true', 'false'])
    .transform((v) => v === 'true')
    .optional(),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  offset: z.coerce.number().int().min(0).default(0),
  region: z.enum([RegionType.KOREA, RegionType.FOREIGN]).optional(),
  sourceId: z.uuid().optional(),
  tag: z.string().optional(),
  type: feedTypeQuerySchema,
});

export type PostQueryDto = z.infer<typeof postQuerySchema>;
