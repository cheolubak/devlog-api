import { BadRequestException, PipeTransform } from '@nestjs/common';
import { z } from 'zod';

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: z.ZodType) {}

  transform(value: unknown) {
    const result = this.schema.safeParse(value);
    if (!result.success) {
      const messages = result.error.issues.map((issue) => {
        const path = issue.path.length > 0 ? issue.path.join('.') : 'request';
        return `${path}: ${issue.message}`;
      });
      throw new BadRequestException(messages);
    }
    return result.data;
  }
}
