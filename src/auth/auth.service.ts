import { Injectable } from '@nestjs/common';
import { LoginReqDto, LoginResDto, LogoutResDto } from 'src/auth/auth.dto';
import { AccountService } from '../account/account.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private accountService: AccountService,
    private jwtService: JwtService
  ) {}

  async login(body: LoginReqDto): Promise<LoginResDto> {
    const accountInfo = await this.accountService.findAccountByField('account_email', body.username);

    if (accountInfo) {
      const {
        account_id,
        account_password,
        account_type
      } = accountInfo;
      const isMatch = await bcrypt.compare(body.password, account_password);
      
      return isMatch
        ? {
          success: true,
          username: body.username,
          type: account_type,
          token: await this.jwtService.signAsync({
            id: account_id,
            type: account_type,
            username: body.username
          }),
        }
        : {
          success: false,
          message: '账号或密码错误',
        }
    }

    return {
      success: false,
      message: '账号或密码错误',
    }
  }

  async logout(): Promise<LogoutResDto> {
    return {
      success: true,
      message: '登出成功',
    };
  }
}
