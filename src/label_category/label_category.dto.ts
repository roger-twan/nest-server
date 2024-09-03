import { LabelCategoryEntity } from './label_category.entity';

export class LabelCategoryListResDto {
  success: boolean;
  message?: string;
  list?: LabelCategoryEntity[];
}
