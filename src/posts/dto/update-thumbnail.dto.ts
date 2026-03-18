import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class UpdateThumbnailDto {
  @IsNotEmpty()
  @IsString()
  @IsUrl()
  imageUrl!: string;
}
