import { IsDefined, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { PageEntity, PageSimpleEntity } from './page.entity';
import { Transform } from 'class-transformer';

export class AddPageReqDto {
  @IsNotEmpty()
  @IsString()
  page_title: string;

  @IsString()
  @IsDefined()
  page_banners?: string;

  @IsDefined()
  @IsInt()
  @Transform(({ value }) => Number(value))
  page_banner_video_id?: number;

  @IsDefined()
  @IsString()
  page_banner_video_post_src?: string;

  @IsDefined()
  @IsString()
  page_banner_video_src?: string;

  @IsDefined()
  @IsString()
  page_top_nav?: string;

  @IsDefined()
  @IsString()
  page_rich_text?: string;
  
  @IsDefined()
  @IsString()
  page_bottom_nav?: string;

  @IsDefined()
  @IsString()
  page_identifier?: string;
}
export class AddPageResDto {
  success: boolean;
  message?: string;
  data?: PageEntity;
}

export class UpdatePageReqDto extends AddPageReqDto {
  @IsInt()
  @IsNotEmpty()
  @Transform(({ value }) => Number(value))
  page_id: number;
}
export class UpdatePageResDto {
  success: boolean;
  message?: string;
}

export class DeletePageReqDto {
  @IsInt()
  @IsNotEmpty()
  page_id: number;
}

export class PageListReqDto {
  @IsInt()
  @IsOptional()
  @Transform(({ value }) => Number(value))
  page?: number = 1;

  @IsInt()
  @IsOptional()
  @Transform(({ value }) => Number(value))
  page_size?: number = 10;
}
export class PageListResDto {
  success: boolean;
  message?: string;
  list?: PageEntity[];
  total?: number;
}

export class PageSimpleListResDto {
  success: boolean;
  message?: string;
  list?: PageSimpleEntity[];
}

export class PageDetailReqDto {
  @IsOptional()
  @IsInt()
  @Transform(({ value }) => Number(value))
  id?: number;

  @IsOptional()
  identifier?: string;
}
export class PageDetailResDto {
  success: boolean;
  message?: string;
  data?: PageEntity;
}
