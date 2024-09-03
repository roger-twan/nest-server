import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { MenuEntity } from './menu.entity';
import { Transform } from 'class-transformer';

export class AddMenuReqDto {
  @IsNotEmpty()
  @IsString()
  menu_name: string;

  @IsInt()
  @IsNotEmpty()
  @Transform(({ value }) => Number(value))
  menu_link_type: number;

  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => value.toString())
  menu_link_id: string;
}
export class AddMenuResDto {
  success: boolean;
  message?: string;
  data?: MenuEntity;
}

export class UpdateMenuReqDto {
  @IsInt()
  @IsNotEmpty()
  @Transform(({ value }) => Number(value))
  menu_id: number;

  @IsOptional()
  menu_name?: string;

  @IsOptional()
  @Transform(({ value }) => Number(value))
  menu_link_type?: number;

  @IsOptional()
  menu_link_id?: string;

  @IsOptional()
  @Transform(({ value }) => Number(value))
  menu_status?: number;
}
export class UpdateMenuResDto {
  success: boolean;
  message?: string;
}

export class SetMenuTopReqDto {
  @IsInt()
  @IsNotEmpty()
  menu_id: number;

  @IsInt()
  @IsNotEmpty()
  menu_order: number;
}

export class SetMenuOrderReqDto {
  @IsInt()
  @IsNotEmpty()
  menu_id: number;

  @IsInt()
  @IsNotEmpty()
  menu_order: number;

  @IsString()
  @IsNotEmpty()
  type: 'up' | 'down';
}

export class DeleteMenuReqDto {
  @IsInt()
  @IsNotEmpty()
  menu_id: number;
}

export class MenuListReqDto {
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
export class MenuListResDto {
  success: boolean;
  message?: string;
  list?: MenuEntity[];
  total?: number;
}

export class MenuDetailReqDto {
  @IsInt()
  @IsNotEmpty()
  @Transform(({ value }) => Number(value))
  id: number;
}
export class MenuDetailResDto {
  success: boolean;
  message?: string;
  data?: MenuEntity;
}
