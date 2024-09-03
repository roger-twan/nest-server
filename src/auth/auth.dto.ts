import { IsEmail, IsNotEmpty, } from 'class-validator';

export class LoginReqDto {
  @IsEmail()
  username: string;

  @IsNotEmpty()
  password: string;
}

export class LoginResDto {
  success: boolean;
  username?: string;
  type?: number;
  token?: string;
  message?: string;
}

export class LogoutResDto {
  success: boolean;
  message?: string;
}
