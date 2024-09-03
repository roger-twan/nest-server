import { IsArray, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { LabelBasicEntity, LabelEntity } from './label.entity';
import { Transform } from 'class-transformer';

export class LabelListReqDto {
  @IsOptional()
  ids?: string;
}
export class LabelListResDto {
  success: boolean;
  message?: string;
  list?: LabelEntity[];
}

export class UpdateLabelReqDto {
  @IsOptional()
  @IsArray()
  add?: LabelBasicEntity[];

  @IsOptional()
  @IsArray()
  delete?: number[];
}
export class UpdateLabelResDto {
  success: boolean;
  message?: string;
}
