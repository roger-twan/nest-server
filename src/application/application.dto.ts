import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApplicationEntity, ApplicationSimpleEntity } from './application.entity';
import { Transform } from 'class-transformer';

export class AddApplicationReqDto {
  @IsNotEmpty()
  @IsString()
  applicant_name: string;

  @IsNotEmpty()
  @IsString()
  applicant_contact: string;

  @IsNotEmpty()
  @IsString()
  applicant_resume_src: string;

  @IsNotEmpty()
  @IsInt()
  application_job_id: number;

  @IsNotEmpty()
  @IsString()
  applicant_openid: string;
}
export class AddApplicationResDto {
  success: boolean;
  message?: string;
}

export class UpdateApplicationStatusReqDto {
  @IsInt()
  @IsNotEmpty()
  @Transform(({ value }) => Number(value))
  application_id: number;

  @IsInt()
  @IsNotEmpty()
  @Transform(({ value }) => Number(value))
  status?: number;
}
export class UpdateApplicationStatusResDto {
  success: boolean;
  message?: string;
}

export class ApplicationListReqDto {
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
  job_title?: string;

  @IsOptional()
  @IsString()
  companies?: string;

  @IsOptional()
  @IsString()
  department?: string;

  @IsOptional()
  @IsString()
  applicant_name?: string;

  @IsOptional()
  @IsString()
  applicant_contact?: string;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsString()
  openid?: string;

  @IsOptional()
  min_date?: Date;

  @IsOptional()
  job_id?: string;
}
export class ApplicationListResDto {
  success: boolean;
  message?: string;
  list?: ApplicationEntity[];
  total?: number;
}

export class ApplicationCountResDto {
  success: boolean;
  message?: string;
  total?: {[status: string]: number};
}

export class ApplicationSimpleListReqDto {
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
  openid?: string;
}
export class ApplicationSimpleListResDto {
  success: boolean;
  message?: string;
  list?: ApplicationSimpleEntity[];
}

export class ApplicationDetailReqDto {
  @IsInt()
  @IsNotEmpty()
  @Transform(({ value }) => Number(value))
  id: number;
}
export class ApplicationDetailResDto {
  success: boolean;
  message?: string;
  data?: ApplicationEntity;
}

export class DeleteApplicationReqDto {
  @IsString()
  ids: string;
}
