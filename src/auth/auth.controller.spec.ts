import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { authDtoMock, loginDtoMock, tokenDto } from './dto/stub/auth.mock.dto';
import { Token } from './dto/token.dto';
import { UserEntity } from './entities/user.entity';

jest.mock('./auth.service');

describe('AuthController', () => {
  let authcontroller: AuthController;
  let authservice: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();

    authcontroller = module.get<AuthController>(AuthController);
    authservice = module.get<AuthService>(AuthService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(authcontroller).toBeDefined();
  });

  describe('login', () => {
    describe('when login is called', () => {
      let userlog: Token;

      beforeEach(async () => {
        userlog = await authcontroller.login(loginDtoMock());
      });

      test('then it should call authservice', () => {
        expect(authservice.login).toBeCalledWith(loginDtoMock());
      });

      test('then it should return login token', () => {
        expect(userlog).toEqual(tokenDto());
      });
    });
  });

  /* ===== register method test=== */
  describe('Register', () => {
    describe('when Register is called', () => {
      let register: UserEntity;

      beforeEach(async () => {
        register = await authcontroller.Register(authDtoMock());
      });

      test('then it should call authservice', () => {
        expect(authservice.registerAccount).toBeCalledWith(authDtoMock());
      });

      test('then it should return user', () => {
        expect(register).toEqual(authDtoMock());
      });
    });
  });
  /* ====== register test ends ===== */
});
