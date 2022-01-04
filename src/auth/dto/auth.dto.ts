import { IsEmail, IsNotEmpty } from 'class-validator';

export class AuthDTO {
  id?: number;
  @IsNotEmpty()
  fullName?: string;
  @IsNotEmpty()
  phone?: number;
  @IsEmail()
  email?: string;
  profile?: string;
  token?: string;
}
