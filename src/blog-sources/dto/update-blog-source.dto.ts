import { IsBoolean, IsEnum, IsOptional, IsString, IsUrl, MaxLength } from 'class-validator';
import { FeedType } from '../../database/generated/prisma';

export class UpdateBlogSourceDto {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  name?: string;

  @IsOptional()
  @IsUrl()
  @MaxLength(500)
  url?: string;

  @IsOptional()
  @IsEnum(FeedType)
  type?: FeedType;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
