import {
  IsEnum,
  IsNotEmpty,
  IsString,
  IsUrl,
  MaxLength,
} from 'class-validator';

import { FeedType } from '../../database/generated/prisma';

export class CreateBlogSourceDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  name: string;

  @IsNotEmpty()
  @IsUrl()
  @MaxLength(500)
  url: string;

  @IsEnum(FeedType)
  type: FeedType;
}
