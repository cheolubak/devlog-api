import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateKeywordDto {
  @IsNotEmpty()
  @IsString()
  keywords!: string;
}
