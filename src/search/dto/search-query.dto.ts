import { Transform } from 'class-transformer';
import {
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Min,
  MinLength,
} from 'class-validator';

import { FeedType } from '../../database/generated/prisma';

export class SearchQueryDto {
  @IsString()
  @MinLength(2)
  q: string;

  @IsInt()
  @Min(1)
  @Transform(({ value }) => parseInt(value, 10))
  limit: number = 20;

  @IsInt()
  @Min(0)
  @Transform(({ value }) => parseInt(value, 10))
  offset: number = 0;

  @IsEnum(FeedType, { each: true })
  @IsOptional()
  @Transform(({ value }) => (Array.isArray(value) ? value : [value]))
  type?: FeedType[];
}
