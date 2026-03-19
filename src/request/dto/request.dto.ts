import { z } from 'zod';

export const requestSchema = z.object({
  email: z.email(),
  url: z.url(),
});

export type RequestDto = z.infer<typeof requestSchema>;
