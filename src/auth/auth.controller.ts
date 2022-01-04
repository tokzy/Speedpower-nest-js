import { Body, Controller, Post } from '@nestjs/common';
import { AuthDTO } from './dto/auth.dto';
import { UserEntity } from './entities/user.entity';

@Controller('auth')
export class AuthController {
  @Post()
  async Login(@Body() body: AuthDTO): Promise<AuthDTO> {
    return body;
  }
}
