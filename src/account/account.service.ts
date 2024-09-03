import { Injectable } from '@nestjs/common';
import { AccountDao } from './account.dao';
import { AccountEntity } from './account.entity';
import * as bcrypt from 'bcrypt';
import {  AccountListReqDto, AccountListResDto, AddAccountReqDto, AddAccountResDto, ResetAccountReqDto, SelfResetAccountReqDto, UpdateAccountCompanyReqDto, UpdateAccountResDto } from './account.dto';

@Injectable()
export class AccountService {
  constructor(private accountDao: AccountDao) {}

  async findAllAccount(query: AccountListReqDto): Promise<AccountListResDto> {
    try {
      const list = await this.accountDao.findAccount(query);
      const total = await this.accountDao.findAccountCount();
      return {
        success: true,
        list: list,
        total: total
      }
    } catch (error) {
      return {
        success: false,
        message: error
      }
    }
  }

  findAccountByField(field: string, value: string | number): Promise<AccountEntity> {
    return this.accountDao.findAccountByField(field, value);
  }

  async addAccount(account: AddAccountReqDto): Promise<AddAccountResDto> {
    account.account_password = await bcrypt.hash(account.account_password, 10);
    try {
       const result = await this.accountDao.addAccount({
        ...account,
        account_type: 2
       });
       return {
        success: true,
        data: result
       }
    } catch (error) {
      return {
        success: false,
        message: error
      }
    }
  }

  async addAdminAccount(account: AddAccountReqDto): Promise<string> {
    account.account_password = await bcrypt.hash(account.account_password, 10);
    try {
      const admin = await this.accountDao.findAdminAccount();
      if (admin) {
        return 'Admin already exists';
      }
      const email = await this.accountDao.findAccountByField('account_email', account.account_email);
      if (email) {
        return 'Email already exists';
      }
      await this.accountDao.addAccount({
        ...account,
        account_type: 1
      });
      return 'Success';
    } catch (error) {
      return error
    }
  }

  async findAccountEmailsByCompanyId(id: number): Promise<string[]> {
    const accounts = await this.accountDao.findAccountsByCompanyId(id);
    const validAccounts = accounts.filter(account => account.account_company_ids.split(',').includes(id.toString()));
    return validAccounts.map(account => account.account_email);
  }

  async resetAccountPwd(account: ResetAccountReqDto): Promise<UpdateAccountResDto> {
    try {
      account.account_password = await bcrypt.hash(account.account_password, 10);
      await this.accountDao.resetAccountPwd({
        account_id: account.account_id,
        account_password: account.account_password
      });
      return {
        success: true,
      }
   } catch (error) {
     return {
       success: false,
       message: error
     }
   }
  }

  async selfResetAccountPwd(account: SelfResetAccountReqDto, id: number): Promise<UpdateAccountResDto> {
    try {
      const accountInfo = await this.findAccountByField('account_id', id);
      const isMatch = await bcrypt.compare(account.old_password, accountInfo.account_password);

      if (!isMatch) {
        return {
          success: false,
          message: '密码错误'
        }
      }

      const pwd = await bcrypt.hash(account.new_password, 10);
      await this.accountDao.resetAccountPwd({
        account_id: id,
        account_password: pwd
      });

      return {
        success: true,
      }
   } catch (error) {
     return {
       success: false,
       message: error
     }
   }
  }

  async updateAccountCompany(account: UpdateAccountCompanyReqDto): Promise<UpdateAccountResDto> {
    try {
      await this.accountDao.updateAccountCompany({
        account_id: account.account_id,
        account_company_ids: account.account_company_ids
      });
      return {
        success: true,
      }
   } catch (error) {
     return {
       success: false,
       message: error
     }
   }
  }

  async deleteAccount(id: number): Promise<UpdateAccountResDto> {
    try {
      await this.accountDao.deleteAccount(id);
      return {
        success: true,
      }
   } catch (error) {
     return {
       success: false,
       message: error
     }
   }
  }
}
