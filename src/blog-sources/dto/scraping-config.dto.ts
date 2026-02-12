import { Type } from 'class-transformer';
import {
  IsIn,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';

export class ScrapingSelectorsDto {
  @IsOptional()
  @IsString()
  author?: string;

  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsString()
  date?: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsNotEmpty()
  @IsString()
  link: string;

  @IsOptional()
  @IsString()
  tags?: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  [key: string]: string | undefined;
}

export class ScrapingConfigDto {
  @IsOptional()
  @IsString()
  dateFormat?: string;

  @IsNotEmpty()
  @IsString()
  listSelector: string;

  @IsIn(['static', 'dynamic'])
  renderMode: 'static' | 'dynamic';

  @ValidateNested()
  @Type(() => ScrapingSelectorsDto)
  selectors: ScrapingSelectorsDto;

  @IsOptional()
  @IsInt()
  @Min(0)
  waitFor?: number;

  [key: string]: string | number | ScrapingSelectorsDto | undefined;
}
