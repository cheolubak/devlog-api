import { IsEmail, IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class RequestDto {
  @IsNotEmpty()
  @IsString()
  @IsUrl()
  url!: string;

  @IsEmail()
  @IsNotEmpty()
  @IsString()
  email!: string;
}
