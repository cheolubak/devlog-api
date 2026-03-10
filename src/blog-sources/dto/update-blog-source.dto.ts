import {
  IsBoolean,
  IsEnum,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
} from 'class-validator';

import { FeedType } from '../../database/generated/prisma/client';

export class UpdateBlogSourceDto {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  name?: string;

  @IsOptional()
  @IsUrl()
  @MaxLength(500)
  url?: string;

  @IsEnum(FeedType)
  @IsOptional()
  type?: FeedType;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
