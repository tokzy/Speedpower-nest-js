import { Body, Controller, Post } from '@nestjs/common';
import { AuthDTO } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  @Post()
  async Login(@Body() body: AuthDTO): Promise<AuthDTO> {
    return body;
  }
}
