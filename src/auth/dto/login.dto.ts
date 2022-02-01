import { PickType } from '@nestjs/mapped-types';
import { RegisterUserDto } from './auth.dto';

export class UserLoginDto extends PickType(RegisterUserDto, [
  'email',
  'password',
] as const) {}
