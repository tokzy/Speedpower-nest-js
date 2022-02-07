import { UserEntity } from '../../entities/user.entity';
import { UserLoginDto } from '../login.dto';
import { Token } from '../token.dto';

export const authDtoMock = (): UserEntity => {
  return {
    id: 1,
    firstName: 'john',
    lastName: 'doe',
    phone: '09025652652',
    email: 'test@gmail.com',
    imagePath: 'test.png',
    password: 'test205',
  };
};

export const loginDtoMock = (): UserLoginDto => {
  return {
    email: 'test@gmail.com',
    password: 'test',
  };
};

export const tokenDto = (): Token => {
  return {
    token: '1fb0f1972a78b03c257fc73acb41eda2',
  };
};
