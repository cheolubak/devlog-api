import { IsBoolean, IsNotEmpty } from 'class-validator';

export class UpdateDisplayDto {
  @IsBoolean()
  @IsNotEmpty()
  isDisplay: boolean;
}
