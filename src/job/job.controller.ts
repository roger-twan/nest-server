import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common';
import { JobService } from './job.service';
import { ApiTags } from '@nestjs/swagger';
import { AddJobReqDto, AddJobResDto, JobDetailReqDto, JobListReqDto, JobListResDto, JobDetailResDto, UpdateJobReqDto, UpdateJobResDto, DeleteJobReqDto, JobCountResDto } from './job.dto';

@ApiTags('Job')
@Controller('job')
export class JobController {
  constructor(private jobService: JobService) {}

  @Get('list')
  getList(@Query() query: JobListReqDto, @Req() req: Request): Promise<JobListResDto> {
    return this.jobService.findAllJob(query, req.user);
  }

  @Get('get_count_by_status')
  getCountByStatus(@Query('status') status: string, @Req() req: Request): Promise<JobCountResDto> {
    return this.jobService.findJobCountByStatus(status, req.user);
  }

  @Get('detail')
  getJobById(@Query() query: JobDetailReqDto): Promise<JobDetailResDto> {
    return this.jobService.findJobById(query.id);
  }

  @Post('add')
  addJob(@Body() company: AddJobReqDto): Promise<AddJobResDto> {
    return this.jobService.addJob(company);
  }

  @Post('update')
  updateJob(@Body() company: UpdateJobReqDto): Promise<UpdateJobResDto> {
    return this.jobService.updateJob(company);
  }

  @Post('delete')
  deleteJob(@Body() body: DeleteJobReqDto): Promise<UpdateJobResDto> {
    return this.jobService.deleteJob(body.job_id);
  }
}
