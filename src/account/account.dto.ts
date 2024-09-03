import { IsDefined, IsEmail, IsInt, IsNotEmpty, IsOptional } from 'class-validator';
import { AccountBasicEntity, AccountEntity } from './account.entity';
import { Transform } from 'class-transformer';
import { IsValidPassword } from 'src/_decorator/password.decorator';

export class AddAccountReqDto {
  @IsNotEmpty()
  @IsEmail()
  account_email: string;

  @IsNotEmpty()
  @IsValidPassword({ message: '密码至少8位,包含数字,大小写字母和特殊字符' })
  account_password: string;

  @IsOptional()
  account_company_ids?: string;
}
export class AddAccountResDto {
  success: boolean;
  message?: string;
  data?: AccountEntity;
}

export class ResetAccountReqDto {
  @IsInt()
  @IsNotEmpty()
  @Transform(({ value }) => Number(value))
  account_id: number;
  
  @IsNotEmpty()
  @IsValidPassword({ message: '密码至少8位,包含数字,大小写字母和特殊字符' })
  account_password: string;
}

export class SelfResetAccountReqDto {
  @IsNotEmpty()
  @IsValidPassword({ message: '密码至少8位,包含数字,大小写字母和特殊字符' })
  old_password: string;

  @IsNotEmpty()
  @IsValidPassword({ message: '密码至少8位,包含数字,大小写字母和特殊字符' })
  new_password: string;
}

export class UpdateAccountCompanyReqDto {
  @IsInt()
  @IsNotEmpty()
  @Transform(({ value }) => Number(value))
  account_id: number;

  @IsDefined()
  account_company_ids: string | null;
}

export class UpdateAccountResDto {
  success: boolean;
  message?: string;
}

export class AccountListReqDto {
  @IsInt()
  @IsOptional()
  @Transform(({ value }) => Number(value))
  page?: number = 1;

  @IsInt()
  @IsOptional()
  @Transform(({ value }) => Number(value))
  page_size?: number = 10;
}
export class AccountListResDto {
  success: boolean;
  message?: string;
  list?: AccountBasicEntity[];
  total?: number;
}

export class DeleteAccountReqDto {
  @IsInt()
  @IsNotEmpty()
  account_id: number;
}
