import { authDtoMock, tokenDto } from '../dto/stub/auth.mock.dto';

export const AuthService = jest.fn().mockReturnValue({
  login: jest.fn().mockResolvedValue(tokenDto().token),
  registerAccount: jest.fn().mockResolvedValue(authDtoMock()),
});
