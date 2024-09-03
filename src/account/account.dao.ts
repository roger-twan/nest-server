import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Like, Repository, UpdateResult } from 'typeorm';
import { AccountBasicEntity, AccountEntity } from './account.entity';
import { AccountListReqDto, AddAccountReqDto, ResetAccountReqDto, UpdateAccountCompanyReqDto } from './account.dto';

class AddAccount extends AddAccountReqDto {
  account_type: number;
}

@Injectable()
export class AccountDao {
  constructor(
    @InjectRepository(AccountEntity)
    private AccountRepository: Repository<AccountEntity>,
  ) {}

  findAccount(query: AccountListReqDto): Promise<AccountBasicEntity[]> {
    return this.AccountRepository.find({
      order: { account_type: 'ASC' },
      skip: (query.page - 1) * query.page_size,
      take: query.page_size
    });
  }

  findAccountsByCompanyId(companyId: number): Promise<AccountEntity[]> {
    return this.AccountRepository.find({
      select: ['account_email', 'account_company_ids'],
      where: {
        account_company_ids:  Like(`%${companyId.toString()}%`)
      }
    });
  }

  findAccountCount(): Promise<number> {
    return this.AccountRepository.count();
  }

  findAccountByField(field: string, value: string | number): Promise<AccountEntity> {
    return this.AccountRepository.findOneBy({ [field]: value });
  }

  findAdminAccount(): Promise<AccountEntity> {
    return this.AccountRepository.findOneBy({ account_type: 1 });
  }

  async addAccount(account: AddAccount): Promise<AccountEntity> {
    const date = new Date();

    return this.AccountRepository.save({
      account_email: account.account_email,
      account_password: account.account_password,
      account_company_ids: account.account_company_ids,
      account_type: account.account_type,
      create_time: date,
      update_time: date,
    });
  }

  updateAccountCompany(account: UpdateAccountCompanyReqDto): Promise<UpdateResult> {
    return this.AccountRepository.update(account.account_id, {
      account_company_ids: account.account_company_ids,
    });
  }

  resetAccountPwd(account: ResetAccountReqDto): Promise<UpdateResult> {
    return this.AccountRepository.update(account.account_id, {
      account_password: account.account_password,
    });
  }

  deleteAccount(id: number): Promise<DeleteResult> {
    return this.AccountRepository.delete(id);
  }
}
