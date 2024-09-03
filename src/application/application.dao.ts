import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Like, MoreThan, Repository, UpdateResult } from 'typeorm';
import { ApplicationBasicEntity, ApplicationEntity, ApplicationSimpleEntity } from './application.entity';
import { ApplicationListReqDto, ApplicationSimpleListReqDto, DeleteApplicationReqDto, UpdateApplicationStatusReqDto } from './application.dto';

@Injectable()
export class ApplicationDao {
  constructor(
    @InjectRepository(ApplicationEntity)
    private applicationRepository: Repository<ApplicationEntity>,
  ) {}

  findApplication(query: ApplicationListReqDto): Promise<ApplicationEntity[]> {
    return this.applicationRepository.find({
      where: {
        application_job_title: query.job_title ? Like(`%${query.job_title}%`) : null,
        application_company_id: query.companies ? In(query.companies.split(',').map(Number)) : null,
        application_department: query.department ? Like(`%${query.department}%`) : null,
        applicant_name: query.applicant_name ? Like(`%${query.applicant_name}%`) : null,
        applicant_contact: query.applicant_contact ? Like(`%${query.applicant_contact}%`) : null,
        application_status: query.status ? In(query.status.split(',').map(Number)) : In([1, 2, 3, 4, 5]),
        applicant_openid: query.openid || null,
        apply_time: query.min_date ? MoreThan(query.min_date) : null,
        application_job_id: query.job_id ? In(query.job_id.split(',').map(Number)) : null
      },
      skip: (query.page - 1) * query.page_size,
      take: query.page_size
    });
  }

  findSimpleApplication(query: ApplicationSimpleListReqDto): Promise<ApplicationSimpleEntity[]> {
    return this.applicationRepository.find({
      select: {
        application_id: true,
        application_job_id: true,
        application_job_title: true,
        application_company_name: true
      },
      where: {
        applicant_openid: query.openid || null,
        application_status: In([1, 2, 3, 4, 5])
      },
      skip: (query.page - 1) * query.page_size,
      take: query.page_size
    });
  }

  findApplicationCount(query: ApplicationListReqDto): Promise<number> {
    return this.applicationRepository.count({
      where: {
        application_job_title: query.job_title ? Like(`%${query.job_title}%`) : null,
        application_company_id: query.companies ? In(query.companies.split(',').map(Number)) : null,
        application_department: query.department ? Like(`%${query.department}%`) : null,
        applicant_name: query.applicant_name ? Like(`%${query.applicant_name}%`) : null,
        applicant_contact: query.applicant_contact ? Like(`%${query.applicant_contact}%`) : null,
        application_status: query.status ? In(query.status.split(',').map(Number)) : In([1, 2, 3, 4, 5]),
        applicant_openid: query.openid || null,
        apply_time: query.min_date ? MoreThan(query.min_date) : null,
        application_job_id: query.job_id ? In(query.job_id.split(',').map(Number)) : null
      },
    });
  }

  findApplicationById(id: number): Promise<ApplicationEntity> {
    return this.applicationRepository.findOneBy({ application_id: id });
  }

  async addApplication(body: ApplicationBasicEntity): Promise<ApplicationEntity> {
    const date = new Date();

    return this.applicationRepository.save({
      ...body,
      application_status: 1,
      apply_time: date,
      update_time: date,
    });
  }

  updateApplicationStatus(body: UpdateApplicationStatusReqDto): Promise<UpdateResult> {
    const data = {
      application_status: body.status,
      update_time: new Date(),
    }
    return this.applicationRepository.update(body.application_id, data);
  }

  deleteApplications(ids: number[]): Promise<UpdateResult> {
    const data = {
      application_status: 0,
      update_time: new Date(),
    }
    return this.applicationRepository.update({ application_id: In(ids) }, data);
  }
}
