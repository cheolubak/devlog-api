import { IsBoolean, IsNotEmpty } from 'class-validator';

export class UpdateDisplayDto {
  @IsNotEmpty()
  @IsBoolean()
  isDisplay: boolean;
}
