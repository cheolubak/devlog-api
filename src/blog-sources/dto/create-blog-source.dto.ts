import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  ValidateIf,
  ValidateNested,
} from 'class-validator';

import { FeedType, RegionType } from '../../database/generated/prisma/client';
import { ScrapingConfigDto } from './scraping-config.dto';

export class CreateBlogSourceDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  name!: string;

  @IsObject()
  @Type(() => ScrapingConfigDto)
  @ValidateIf((o) => o.type === 'SCRAPING')
  @ValidateNested()
  scrapingConfig?: ScrapingConfigDto;

  @IsEnum(FeedType)
  type!: FeedType;

  @IsNotEmpty()
  @IsUrl()
  @MaxLength(500)
  url!: string;

  @IsNotEmpty()
  @IsUrl()
  @MaxLength(500)
  blogUrl!: string;

  @IsEnum(RegionType)
  @IsNotEmpty()
  region!: RegionType;

  @IsOptional()
  @IsString()
  icon?: string;
}
