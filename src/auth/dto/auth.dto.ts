import {
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
} from 'class-validator';

export class RegisterUserDto {
  @IsNotEmpty()
  firstName?: string;

  @IsNotEmpty()
  lastName?: string;

  @IsNotEmpty()
  @IsNumberString()
  phone?: string;

  @IsNotEmpty()
  @IsEmail()
  email?: string;

  @IsOptional()
  imagePath?: string;

  @IsNotEmpty()
  password?: string;
}
