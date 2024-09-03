import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { VideoEntity } from './video.entity';
import { Transform } from 'class-transformer';

export class AddVideoReqDto {
  @IsNotEmpty()
  @IsString()
  video_src: string;

  @IsNotEmpty()
  @IsString()
  video_name: string;

  @IsNotEmpty()
  @IsString()
  video_title: string;

  @IsOptional()
  video_description?: string;

  @IsNotEmpty()
  @IsString()
  video_poster: string;
}
export class AddVideoResDto {
  success: boolean;
  message?: string;
  data?: VideoEntity;
}

export class UpdateVideoReqDto {
  @IsInt()
  @IsNotEmpty()
  @Transform(({ value }) => Number(value))
  video_id: number;

  @IsOptional()
  video_src?: string;

  @IsOptional()
  video_title?: string;

  @IsOptional()
  video_name?: string;

  @IsOptional()
  video_description?: string;

  @IsOptional()
  video_poster?: string;
}
export class UpdateVideoResDto {
  success: boolean;
  message?: string;
}
export class DeleteVideoReqDto {
  @IsInt()
  @IsNotEmpty()
  video_id: number;
}

export class VideoListReqDto {
  @IsInt()
  @IsOptional()
  @Transform(({ value }) => Number(value))
  page?: number = 1;

  @IsInt()
  @IsOptional()
  @Transform(({ value }) => Number(value))
  page_size?: number = 10;
}
export class VideoListResDto {
  success: boolean;
  message?: string;
  list?: VideoEntity[];
  total?: number;
}

export class VideoDetailReqDto {
  @IsInt()
  @IsNotEmpty()
  @Transform(({ value }) => Number(value))
  id: number;
}
export class VideoDetailResDto {
  success: boolean;
  message?: string;
  data?: VideoEntity;
}
