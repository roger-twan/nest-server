import { Injectable } from '@nestjs/common';
import { JobDao } from './job.dao';
import { AddJobReqDto, JobListReqDto, JobListResDto, JobDetailResDto, AddJobResDto, UpdateJobReqDto, UpdateJobResDto, JobCountResDto } from './job.dto';
import { AccountService } from 'src/account/account.service';

@Injectable()
export class JobService {
  constructor(
    private jobDao: JobDao,
    private accountService: AccountService,
  ) {}

  async findAllJob(query: JobListReqDto, user?: Request['user']): Promise<JobListResDto> {
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

      const list = await this.jobDao.findJob(query);
      const total = await this.jobDao.findJobCount(query);
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

  async findJobCountByStatus(status: string, user?: Request['user']): Promise<JobCountResDto> {
    try {
      let companies = null;
      if (user && user.type === 2) {
        const userInfo = await this.accountService.findAccountByField('account_id', user.id);
        if (!userInfo || !userInfo.account_company_ids) {
          return {
            success: true,
            total: 0
          }
        }

        companies = userInfo.account_company_ids;
      }

      const total = await this.jobDao.findJobCount({
        status,
        companies
      });
      return {
        success: true,
        total: total
      }
    } catch (error) {
      return {
        success: false,
        message: error
      }
    }
  }

  async findJobById(id: number): Promise<JobDetailResDto> {
    try {
      const job = await this.jobDao.findJobById(id);
      return {
        success: true,
        data: job
      }
    } catch (error) {
      return {
        success: false,
        message: error
      }
    }
  }

  async addJob(job: AddJobReqDto): Promise<AddJobResDto> {
    try {
       const result = await this.jobDao.addJob(job);
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

  async updateJob(job: UpdateJobReqDto): Promise<UpdateJobResDto> {
    try {
      await this.jobDao.updateJob(job);
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

  async deleteJob(id: number): Promise<UpdateJobResDto> {
    try {
      await this.jobDao.deleteJob(id);
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
function req(): (target: JobService, propertyKey: "findAllJob", parameterIndex: 1) => void {
  throw new Error('Function not implemented.');
}
