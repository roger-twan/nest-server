import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginReqDto, LoginResDto, LogoutResDto } from 'src/auth/auth.dto';
import { Public } from 'src/_decorator/public.decorator';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('login')
  login(@Body() body: LoginReqDto): Promise<LoginResDto> {
    return this.authService.login(body);
  }

  @Public()
  @Get('logout')
  logout(): Promise<LogoutResDto> {
    return this.authService.logout()
  }
}
