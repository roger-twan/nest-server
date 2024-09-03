import { Injectable } from '@nestjs/common';
import { ApplicationDao } from './application.dao';
import { AddApplicationReqDto, ApplicationListReqDto, ApplicationListResDto, ApplicationDetailResDto, AddApplicationResDto, UpdateApplicationStatusReqDto, UpdateApplicationStatusResDto, ApplicationSimpleListReqDto, ApplicationSimpleListResDto, ApplicationCountResDto } from './application.dto';
import { JobService } from 'src/job/job.service';
import { CompanyService } from 'src/company/company.service';
import { AccountService } from 'src/account/account.service';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class ApplicationService {
  constructor(
    private applicationDao: ApplicationDao,
    private jobService: JobService,
    private companyService: CompanyService,
    private accountService: AccountService,
    private emailService: EmailService,
  ) {}

  async findAllApplication(query: ApplicationListReqDto, user?: Request['user']): Promise<ApplicationListResDto> {
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

      const list = await this.applicationDao.findApplication(query);
      const total = await this.applicationDao.findApplicationCount(query);
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

  async findApplicationCountByStatus(status: string, user?: Request['user']): Promise<ApplicationCountResDto> {
    try {
      const result = {}
      let companies = null;
      if (user && user.type === 2) {
        const userInfo = await this.accountService.findAccountByField('account_id', user.id);
        if (!userInfo || !userInfo.account_company_ids) {
          return {
            success: true,
            total: {}
          }
        }

        companies = userInfo.account_company_ids;
      }
      if (status) {
        const statusArr = status.split(',');
        for (const status of statusArr) {
          result[status] = await this.applicationDao.findApplicationCount({
            status,
            companies
          });
        }
      }
      return {
        success: true,
        total: result
      }
    } catch (error) {
      return {
        success: false,
        message: error
      }
    }
  }

  async findSimpleApplication(query: ApplicationSimpleListReqDto): Promise<ApplicationSimpleListResDto> {
    try {
      const list = await this.applicationDao.findSimpleApplication(query);
      return {
        success: true,
        list: list,
      }
    } catch (error) {
      return {
        success: false,
        message: error
      }
    }
  }

  async findApplicationById(id: number): Promise<ApplicationDetailResDto> {
    try {
      const application = await this.applicationDao.findApplicationById(id);
      return {
        success: true,
        data: application
      }
    } catch (error) {
      return {
        success: false,
        message: error
      }
    }
  }

  async addApplication(application: AddApplicationReqDto): Promise<AddApplicationResDto> {
    try {
      const { data: jobData } = await this.jobService.findJobById(application.application_job_id);
      const { data: companyData } = await this.companyService.findCompanyById(jobData.job_company_id);
      const result = await this.applicationDao.addApplication({
        ...application,
        application_company_name: companyData.company_name,
        application_job_title: jobData.job_title,
        application_company_id: jobData.job_company_id,
        application_department: jobData.job_department,
      });

      this.emailService.sendResumeNotifyEmail(
        result.application_id,
        jobData.job_title,
        jobData.job_company_id,
      )

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

  async updateApplication(application: UpdateApplicationStatusReqDto): Promise<UpdateApplicationStatusResDto> {
    try {
      await this.applicationDao.updateApplicationStatus(application);
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

  async deleteApplication(ids: string): Promise<UpdateApplicationStatusResDto> {
    try {
      await this.applicationDao.deleteApplications(ids.split(',').map(Number));
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
