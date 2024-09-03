import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, In, Like, Repository, UpdateResult } from 'typeorm';
import { JobEntity } from './job.entity';
import { AddJobReqDto, JobListReqDto, UpdateJobReqDto } from './job.dto';

@Injectable()
export class JobDao {
  constructor(
    @InjectRepository(JobEntity)
    private jobRepository: Repository<JobEntity>,
  ) {}

  findJob(query: JobListReqDto): Promise<JobEntity[]> {
    return this.jobRepository.find({
      where: {
        job_title: query.title ? Like(`%${query.title}%`) : null,
        job_company_id: query.companies ? In(query.companies.split(',').map(Number)) : null,
        job_department: query.department ? Like(`%${query.department}%`) : null,
        job_status: query.status ? In(query.status.split(',').map(Number)) : null
      },
      order: { job_id: 'DESC' },
      skip: (query.page - 1) * query.page_size,
      take: query.page_size
    });
  }

  findJobCount(query: JobListReqDto): Promise<number> {
    return this.jobRepository.count({
      where: {
        job_title: query.title ? Like(`%${query.title}%`) : null,
        job_company_id: query.companies ? In(query.companies.split(',').map(Number)) : null,
        job_department: query.department ? Like(`%${query.department}%`) : null,
        job_status: query.status ? In(query.status.split(',').map(Number)) : null
      },
    });
  }

  findJobById(id: number): Promise<JobEntity> {
    return this.jobRepository.findOneBy({ job_id: id });
  }

  async addJob(job: AddJobReqDto): Promise<JobEntity> {
    const date = new Date();

    return this.jobRepository.save({
      ...job,
      job_status: 0,
      create_time: date,
      update_time: date,
    });
  }

  updateJob(job: UpdateJobReqDto): Promise<UpdateResult> {
    const data = {
      ...job,
      update_time: new Date(),
    }
    const filteredData = {};
    for (const key in data) {
      if (![undefined, null].includes(data[key])) {
        filteredData[key] = data[key];
      }
    }
    return this.jobRepository.update(job.job_id, filteredData);
  }

  deleteJob(id: number): Promise<DeleteResult> {
    return this.jobRepository.delete(id);
  }
}
