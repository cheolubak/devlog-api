import { z } from 'zod';

export const updateKeywordSchema = z.object({
  keywords: z.string().min(1),
});

export type UpdateKeywordDto = z.infer<typeof updateKeywordSchema>;
