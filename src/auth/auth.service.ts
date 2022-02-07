import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { RegisterUserDto } from './dto/auth.dto';
import { UserLoginDto } from './dto/login.dto';
import { isEmpty } from 'lodash';
import * as fs from 'fs/promises';
import * as randstring from 'randomstring';
import { join } from 'path';

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

  public async checkIfUserExists(user: RegisterUserDto): Promise<boolean> {
    const { email } = user;
    return await this.userEntityRepository
      .count({ email: email })
      .then((count) => {
        if (count > 0) {
          return true;
        } else {
          return false;
        }
      });
  }

  private async addProfileImage(imageString: string): Promise<string> {
    const directory = process.cwd() + '/public/images';
    let newPath: string;
    let imageName: string;
    let finalPath: string;

    if (!isEmpty(imageString)) {
      const buffer = Buffer.from(imageString, 'base64');
      imageName = randstring.generate(7) + '.jpeg';
      newPath = join(directory, imageName);
      await fs.writeFile(newPath, buffer);
      finalPath = 'images/' + imageName;
    } else {
      finalPath = imageString;
    }

    return finalPath;
  }

  public async registerAccount(user: RegisterUserDto): Promise<UserEntity> {
    const { firstName, lastName, email, phone, imagePath, password } = user;

    if ((await this.checkIfUserExists(user)) == true) {
      throw new HttpException('User Already Exists', HttpStatus.FORBIDDEN);
    } else {
      return await this.hashPassword(password)
        .then(async (password) => {
          return this.addProfileImage(imagePath)
            .then((imagePath) => {
              return this.userEntityRepository
                .save({
                  firstName,
                  lastName,
                  phone,
                  email,
                  imagePath,
                  password,
                })
                .then((user) => {
                  delete user.password;
                  if (!isEmpty(imagePath)) {
                    user.imagePath = process.env.baseUrl + '' + imagePath;
                  }
                  return user;
                })
                .catch((err) => {
                  return err;
                });
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => {
          return err;
        });
    }
  }

  public async validateUser(
    email: string,
    password: string,
  ): Promise<UserEntity> {
    return await this.userEntityRepository
      .findOne(
        { email },
        {
          select: [
            'id',
            'firstName',
            'lastName',
            'email',
            'imagePath',
            'password',
            'phone',
          ],
        },
      )
      .then(async (user) => {
        if (!user) {
          throw new HttpException(
            'Invalid Credentials',
            HttpStatus.UNAUTHORIZED,
          );
        } else {
          return await bcrypt
            .compare(password, user.password)
            .then((isValidPassword) => {
              if (isValidPassword) {
                delete user.password;
                if (!isEmpty(user.imagePath)) {
                  user.imagePath = process.env.baseUrl + '' + user.imagePath;
                }
                return user;
              } else {
                throw new HttpException(
                  'Invalid Credentials',
                  HttpStatus.UNAUTHORIZED,
                );
              }
            });
        }
      });
  }

  public async login(user: UserLoginDto): Promise<string> {
    const { email, password } = user;
    return this.validateUser(email, password).then((user) => {
      if (user) {
        return this.jwtservice.signAsync({ user });
      } else {
        throw new HttpException('Invalid Credentials', HttpStatus.UNAUTHORIZED);
      }
    });
  }
}
