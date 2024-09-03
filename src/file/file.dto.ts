import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';

export enum Purpose {
  Banner = 'banner',
  Resume = 'resume',
  Richtext = 'richtext',
  PageNavigation = 'page-navigation',
  PageBanner = 'page-banner',
  Video = 'video'
}

export class UploadFileReqDto {
  @IsNotEmpty()
  @ApiProperty({ type: 'file', format: 'binary' })
  file: File;

  @IsNotEmpty()
  @IsEnum(Purpose)
  purpose: Purpose;
}

export class UploadFileResDto {
  success: boolean;
  message?: string;
  url?: string;
}
