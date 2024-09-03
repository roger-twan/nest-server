import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common';
import { AccountService } from './account.service';
import { ApiTags, ApiExcludeEndpoint } from '@nestjs/swagger';
import { Role, Roles } from 'src/_decorator/role.decorator';
import { AccountListReqDto, AccountListResDto, AddAccountReqDto, AddAccountResDto, DeleteAccountReqDto, ResetAccountReqDto, SelfResetAccountReqDto, UpdateAccountCompanyReqDto, UpdateAccountResDto } from './account.dto';
import { Public } from 'src/_decorator/public.decorator';

@ApiTags('Account')
@Controller('account')
export class AccountController {
  constructor(private accountService: AccountService) {}

  @Roles(Role.Admin)
  @Get('list')
  getList(@Query() query: AccountListReqDto): Promise<AccountListResDto> {
    return this.accountService.findAllAccount(query);
  }

  @Roles(Role.Admin)
  @Post('add')
  addAccount(@Body() account: AddAccountReqDto): Promise<AddAccountResDto> {
    return this.accountService.addAccount(account);
  }

  @Roles(Role.Admin)
  @Post('reset_password')
  resetAccountPwd(@Body() account: ResetAccountReqDto): Promise<UpdateAccountResDto> {
    return this.accountService.resetAccountPwd(account);
  }

  @Roles(Role.User)
  @Post('self_reset_password')
  selfResetAccountPwd(@Body() account: SelfResetAccountReqDto,  @Req() req: Request): Promise<UpdateAccountResDto> {
    return this.accountService.selfResetAccountPwd(account, req.user.id);
  }

  @Roles(Role.Admin)
  @Post('update_company')
  updateAccountCompany(@Body() account: UpdateAccountCompanyReqDto): Promise<UpdateAccountResDto> {
    return this.accountService.updateAccountCompany(account);
  }

  @Roles(Role.Admin)
  @Post('delete')
  deleteAccount(@Body() body: DeleteAccountReqDto): Promise<UpdateAccountResDto> {
    return this.accountService.deleteAccount(body.account_id);
  }

  @Public()
  @ApiExcludeEndpoint()
  @Get('init_admin')
  initAdmin(@Query() query: AddAccountReqDto): Promise<string> {
    return this.accountService.addAdminAccount(query);
  }
}
