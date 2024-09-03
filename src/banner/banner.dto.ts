import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { BannerEntity } from './banner.entity';
import { Transform } from 'class-transformer';

export class AddBannerReqDto {
  @IsNotEmpty()
  @IsString()
  banner_src: string;

  @IsOptional()
  banner_title?: string;

  @IsOptional()
  banner_description?: string;

  @IsOptional()
  banner_link?: string;
}
export class AddBannerResDto {
  success: boolean;
  message?: string;
  data?: BannerEntity;
}

export class UpdateBannerReqDto {
  @IsInt()
  @IsNotEmpty()
  @Transform(({ value }) => Number(value))
  banner_id: number;

  @IsOptional()
  banner_src?: string;

  @IsOptional()
  banner_title?: string;

  @IsOptional()
  banner_description?: string;

  @IsOptional()
  banner_link?: string;

  @IsOptional()
  banner_status?: number;
}
export class UpdateBannerResDto {
  success: boolean;
  message?: string;
}

export class SetBannerTopReqDto {
  @IsInt()
  @IsNotEmpty()
  banner_id: number;

  @IsInt()
  @IsNotEmpty()
  banner_order: number;
}

export class SetBannerOrderReqDto {
  @IsInt()
  @IsNotEmpty()
  banner_id: number;

  @IsInt()
  @IsNotEmpty()
  banner_order: number;

  @IsString()
  @IsNotEmpty()
  type: 'up' | 'down';
}

export class DeleteBannerReqDto {
  @IsInt()
  @IsNotEmpty()
  banner_id: number;
}

export class BannerListReqDto {
  @IsInt()
  @IsOptional()
  @Transform(({ value }) => Number(value))
  status?: number;

  @IsInt()
  @IsOptional()
  @Transform(({ value }) => Number(value))
  page?: number = 1;

  @IsInt()
  @IsOptional()
  @Transform(({ value }) => Number(value))
  page_size?: number = 10;
}
export class BannerListResDto {
  success: boolean;
  message?: string;
  list?: BannerEntity[];
  total?: number;
}

export class BannerDetailReqDto {
  @IsInt()
  @IsNotEmpty()
  @Transform(({ value }) => Number(value))
  id: number;
}
export class BannerDetailResDto {
  success: boolean;
  message?: string;
  data?: BannerEntity;
}
