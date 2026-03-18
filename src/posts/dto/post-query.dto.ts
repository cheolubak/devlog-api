import { Transform } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  Min,
} from 'class-validator';

import { FeedType, RegionType } from '../../database/generated/prisma/client';

export class PostQueryDto {
  @IsOptional()
  @IsUUID()
  sourceId?: string;

  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => value === 'true')
  isDisplay?: boolean;

  @IsOptional()
  @IsString()
  tag?: string;

  @IsInt()
  @IsOptional()
  @Max(100)
  @Min(1)
  @Transform(({ value }) => parseInt(value, 10))
  limit?: number = 20;

  @IsInt()
  @IsOptional()
  @Min(0)
  @Transform(({ value }) => parseInt(value, 10))
  offset?: number = 0;

  @IsEnum(FeedType, { each: true })
  @IsOptional()
  @Transform(({ value }) => (Array.isArray(value) ? value : [value]))
  type?: FeedType[];

  @IsArray()
  @IsOptional()
  @Transform(({ value }) =>
    Array.isArray(value)
      ? value
      : value === undefined || value === null || value === ''
        ? undefined
        : value.split(','),
  )
  ids?: string[];

  @IsEnum(RegionType)
  @IsOptional()
  region?: RegionType;
}
