import { z } from 'zod';

export const updateThumbnailSchema = z.object({
  imageUrl: z.url(),
});

export type UpdateThumbnailDto = z.infer<typeof updateThumbnailSchema>;
