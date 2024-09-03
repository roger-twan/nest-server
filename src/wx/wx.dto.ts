import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEnum, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class AuthReqDto {
  @IsNotEmpty()
  @IsString()
  code: string;
}

export class AuthResDto {
  success: boolean;
  message?: string;
  openid?: string;
}

export class CheckApplicableReqDto {
  @IsNotEmpty()
  @IsString()
  openid: string;

  @IsNotEmpty()
  @IsInt()
  @Transform(({ value }) => Number(value))
  job_id: number;
}

export class CheckApplicableAndResDto {
  success: boolean;
  message?: string;
  applicable?: boolean;
}
