import { IsEmail, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class AuthDTO {
  @IsOptional()
  @IsNumber()
  id?: number;
  @IsNotEmpty()
  firstName?: string;
  @IsNotEmpty()
  lastName?: string;
  @IsNotEmpty()
  phone?: string;
  @IsEmail()
  email?: string;
  @IsOptional()
  imagePath?: string;
  @IsOptional()
  password?: string
}
