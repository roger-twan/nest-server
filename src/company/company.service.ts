import { Injectable } from '@nestjs/common';
import { CompanyDao } from './company.dao';
import { AddCompanyReqDto, AddCompanyResDto, CompanyDetailResDto, CompanyListReqDto, CompanyListResDto, CompanySimpleListResDto, UpdateCompanyReqDto, UpdateCompanyResDto } from './company.dto';
import { AccountService } from 'src/account/account.service';

@Injectable()
export class CompanyService {
  constructor(
    private companyDao: CompanyDao,
    private accountService: AccountService
  ) {}

  async findAllCompany(query: CompanyListReqDto, user?: Request['user']): Promise<CompanyListResDto> {
    try {
      if (user && user.type === 2) {
        const userInfo = await this.accountService.findAccountByField('account_id', user.id);
        if (!userInfo || !userInfo.account_company_ids) {
          return {
            success: true,
            list: [],
            total: 0
          }
        }

        query.companies = userInfo.account_company_ids;
      }
      const list = await this.companyDao.findCompany(query);
      const total = await this.companyDao.findCompanyCount(query);
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

  async findAllCompanySimple(query: CompanyListReqDto, user?: Request['user']): Promise<CompanySimpleListResDto> {
    try {
      if (user && user.type === 2) {
        const userInfo = await this.accountService.findAccountByField('account_id', user.id);
        if (!userInfo || !userInfo.account_company_ids) {
          return {
            success: true,
            list: [],
            total: 0
          }
        }

        query.companies = userInfo.account_company_ids;
      }
      const list = await this.companyDao.findCompanySimple(query);
      const total = await this.companyDao.findCompanyCount(query);
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

  async findCompanyById(id: number): Promise<CompanyDetailResDto> {
    try {
      const company = await this.companyDao.findCompanyById(id);
      return {
        success: true,
        data: company
      }
    } catch (error) {
      return {
        success: false,
        message: error
      }
    }
  }

  async addCompany(company: AddCompanyReqDto): Promise<AddCompanyResDto> {
    try {
       const result = await this.companyDao.addCompany(company);
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

  async updateCompany(company: UpdateCompanyReqDto): Promise<UpdateCompanyResDto> {
    try {
      await this.companyDao.updateCompany(company);
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

  async setCompanyTop(id: number): Promise<UpdateCompanyResDto> {
    try {
      await this.companyDao.setCompanyTop(id);
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

  async deleteCompany(id: number): Promise<UpdateCompanyResDto> {
    try {
      await this.companyDao.deleteCompany(id);
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
