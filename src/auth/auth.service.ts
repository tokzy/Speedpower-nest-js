import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { AuthDTO } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userEntityRepository: Repository<UserEntity>,
    private readonly jwtservice: JwtService,
  ) {}

  private async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 12);
  }

  public async registerAccount(user: AuthDTO): Promise<AuthDTO> {
    const { firstName, lastName, email,phone ,password } = user;
    return await this.hashPassword(password).then((password) => {
      return this.userEntityRepository.save({
        firstName,
        lastName,
        phone,
        email,
        password,
      });
    });
  }

  




}
