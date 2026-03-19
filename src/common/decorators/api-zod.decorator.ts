import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiQuery } from '@nestjs/swagger';
import { z } from 'zod';

type JsonSchema = Record<string, unknown>;

export function ApiZodBody(schema: z.ZodType) {
  return applyDecorators(ApiBody({ schema: zodToJsonSchema(schema) }));
}

export function ApiZodQuery(schema: z.ZodObject<z.ZodRawShape>) {
  const jsonSchema = zodToJsonSchema(schema) as {
    properties?: Record<string, JsonSchema>;
    required?: string[];
  };
  const properties = jsonSchema.properties ?? {};
  const required = new Set(jsonSchema.required ?? []);

  const decorators = Object.entries(properties).map(([name, prop]) => {
    const queryOptions: Record<string, unknown> = {
      name,
      required: required.has(name),
    };

    if (prop.type) queryOptions.type = prop.type;
    if (prop.enum) queryOptions.enum = prop.enum;
    if (prop.description) queryOptions.description = prop.description;
    if (prop.default !== undefined) queryOptions.example = prop.default;

    return ApiQuery(queryOptions);
  });

  return applyDecorators(...decorators);
}

function zodToJsonSchema(schema: z.ZodType): JsonSchema {
  const jsonSchema = z.toJSONSchema(schema, {
    unrepresentable: 'any',
  }) as JsonSchema;
  delete jsonSchema['$schema'];
  return jsonSchema;
}
