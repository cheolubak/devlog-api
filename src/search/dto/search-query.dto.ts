import { Transform } from 'class-transformer';
import { IsInt, IsString, Min, MinLength } from 'class-validator';

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
}
