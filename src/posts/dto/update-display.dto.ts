import { z } from 'zod';

export const updateDisplaySchema = z.object({
  isDisplay: z.boolean(),
});

export type UpdateDisplayDto = z.infer<typeof updateDisplaySchema>;
