import { IsEmail, IsNotEmpty, IsNumber } from 'class-validator';

export class AuthDTO {
  id?: number;
  @IsNotEmpty()
  fullName?: string;
  @IsNotEmpty()
  @IsNumber()
  phone?: number;
  @IsEmail()
  email?: string;
  profile?: string;
  token?: string;
}
