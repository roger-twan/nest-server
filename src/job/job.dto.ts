import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { JobEntity } from './job.entity';
import { Transform } from 'class-transformer';

export class AddJobReqDto {
  @IsNotEmpty()
  @IsString()
  job_title: string;

  @IsNotEmpty()
  @IsString()
  job_department: string;

  @IsNotEmpty()
  @IsInt()
  job_company_id: number;

  @IsOptional()
  @IsString()
  job_label_ids?: string;

  @IsNotEmpty()
  @IsString()
  job_detail: string;

  @IsOptional()
  @IsString()
  job_custom_salary?: string;
}
export class AddJobResDto {
  success: boolean;
  message?: string;
  data?: JobEntity;
}

export class UpdateJobReqDto {
  @IsInt()
  @IsNotEmpty()
  @Transform(({ value }) => Number(value))
  job_id: number;

  @IsOptional()
  job_title?: string;

  @IsOptional()
  job_department?: string;

  @IsOptional()
  @Transform(({ value }) => Number(value))
  job_company_id?: number;

  @IsOptional()
  job_label_ids?: string;

  @IsOptional()
  job_detail?: string;

  @IsOptional()
  @Transform(({ value }) => Number(value))
  job_status?: number;

  @IsOptional()
  job_custom_salary?: string;
}
export class UpdateJobResDto {
  success: boolean;
  message?: string;
}

export class DeleteJobReqDto {
  @IsInt()
  @IsNotEmpty()
  job_id: number;
}

export class JobListReqDto {
  @IsInt()
  @IsOptional()
  @Transform(({ value }) => Number(value))
  page?: number = 1;

  @IsInt()
  @IsOptional()
  @Transform(({ value }) => Number(value))
  page_size?: number = 10;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  companies?: string;

  @IsOptional()
  @IsString()
  department?: string;

  @IsOptional()
  @IsString()
  status?: string;
}
export class JobListResDto {
  success: boolean;
  message?: string;
  list?: JobEntity[];
  total?: number;
}

export class JobDetailReqDto {
  @IsInt()
  @IsNotEmpty()
  @Transform(({ value }) => Number(value))
  id: number;
}
export class JobDetailResDto {
  success: boolean;
  message?: string;
  data?: JobEntity;
}

export class JobCountResDto {
  success: boolean;
  message?: string;
  total?: number;
}
