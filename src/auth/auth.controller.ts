import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/auth.dto';
import { UserLoginDto } from './dto/login.dto';
import { Token } from './dto/token.dto';
import { UserEntity } from './entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() user: UserLoginDto): Promise<Token> {
    return await this.authService.login(user).then((token) => {
      return { token: token };
    });
  }

  @Post('register')
  async Register(@Body() body: RegisterUserDto): Promise<UserEntity> {
    return await this.authService.registerAccount(body);
  }
}
