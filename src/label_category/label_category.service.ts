import { Injectable } from '@nestjs/common';
import { LabelCategoryDao } from './label_category.dao';
import { LabelCategoryListResDto } from './label_category.dto';

@Injectable()
export class LabelCategoryService {
  constructor(
    private labelCategoryDao: LabelCategoryDao
  ) {}

  async findLabelCategory(): Promise<LabelCategoryListResDto> {
    try {
      const list = await this.labelCategoryDao.findLabelCategory();
      return {
        success: true,
        list: list,
      }
    } catch (error) {
      return {
        success: false,
        message: error
      }
    }
  }
}
