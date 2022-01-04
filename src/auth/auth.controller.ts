import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDTO } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async Login(
    @Body() body: { email: string; password: string },
  ): Promise<{ token: string }> {
    return this.authService.login(body).then((token) => {
      return { token: token };
    });
  }

  @Post('register')
  async Register(@Body() body: AuthDTO): Promise<AuthDTO> {
    return this.authService.registerAccount(body);
  }
}
