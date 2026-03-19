import { z } from 'zod';

export const socialLoginSchema = z.object({
  accessToken: z.string().min(1),
  sessionId: z.string().min(1),
});

export type SocialLoginDto = z.infer<typeof socialLoginSchema>;
