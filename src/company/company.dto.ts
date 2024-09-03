import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CompanyEntity, CompanySimpleEntity } from './company.entity';
import { Transform } from 'class-transformer';

export class AddCompanyReqDto {
  @IsNotEmpty()
  @IsString()
  company_name: string;

  @IsNotEmpty()
  @IsString()
  company_intro: string;

  @IsNotEmpty()
  @IsString()
  company_address: string;

  @IsNotEmpty()
  @IsString()
  company_coordinate: string;

  @IsNotEmpty()
  @IsString()
  company_description: string;

  @IsNotEmpty()
  @IsString()
  company_policy: string;
}
export class AddCompanyResDto {
  success: boolean;
  message?: string;
  data?: CompanyEntity;
}

export class UpdateCompanyReqDto {
  @IsInt()
  @IsNotEmpty()
  @Transform(({ value }) => Number(value))
  company_id: number;

  @IsOptional()
  company_name?: string;

  @IsOptional()
  company_intro?: string;

  @IsOptional()
  company_address?: string;

  @IsOptional()
  company_coordinate?: string;

  @IsOptional()
  company_description?: number;

  @IsOptional()
  company_policy?: number;
}
export class UpdateCompanyResDto {
  success: boolean;
  message?: string;
}

export class SetCompanyTopReqDto {
  @IsInt()
  @IsNotEmpty()
  company_id: number;
}

export class DeleteCompanyReqDto {
  @IsInt()
  @IsNotEmpty()
  company_id: number;
}

export class CompanyListReqDto {
  @IsInt()
  @IsOptional()
  @Transform(({ value }) => Number(value))
  page?: number = 1;

  @IsInt()
  @IsOptional()
  @Transform(({ value }) => Number(value))
  page_size?: number = 10;

  @IsInt()
  @IsOptional()
  companies?: string;
}
export class CompanyListResDto {
  success: boolean;
  message?: string;
  list?: CompanyEntity[];
  total?: number;
}
export class CompanySimpleListResDto {
  success: boolean;
  message?: string;
  list?: CompanySimpleEntity[];
  total?: number;
}

export class CompanyDetailReqDto {
  @IsInt()
  @IsNotEmpty()
  @Transform(({ value }) => Number(value))
  id: number;
}
export class CompanyDetailResDto {
  success: boolean;
  message?: string;
  data?: CompanyEntity;
}
