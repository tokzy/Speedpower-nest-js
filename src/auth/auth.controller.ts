import { Body, Controller, Post } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/auth.dto';
import { UserLoginDto } from './dto/login.dto';
import { UserEntity } from './entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() user: UserLoginDto): Observable<{ token: string }> {
    return this.authService
      .login(user)
      .pipe(map((jwt: string) => ({ token: jwt })));
  }

  @Post('register')
  async Register(@Body() body: RegisterUserDto): Promise<UserEntity> {
    return this.authService.registerAccount(body);
  }
}
