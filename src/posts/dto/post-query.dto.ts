import { IsBoolean, IsOptional, IsString, IsUUID, IsInt, Min } from 'class-validator';
import { Transform } from 'class-transformer';

export class PostQueryDto {
  @IsOptional()
  @IsUUID()
  sourceId?: string;

  @IsOptional()
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  isDisplay?: boolean;

  @IsOptional()
  @IsString()
  tag?: string;

  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  @Min(1)
  limit?: number = 20;

  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  @Min(0)
  offset?: number = 0;
}
