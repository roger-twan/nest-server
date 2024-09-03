import { Injectable } from '@nestjs/common';
import { LabelDao } from './label.dao';
import { LabelListReqDto, LabelListResDto, UpdateLabelReqDto, UpdateLabelResDto } from './label.dto';
import { LabelBasicEntity } from './label.entity';

@Injectable()
export class LabelService {
  constructor(
    private labelDao: LabelDao,
  ) {}

  async findLabel(query?: LabelListReqDto): Promise<LabelListResDto> {
    try {
      const ids = query && query.ids ? query.ids.split(',').map(Number) : undefined;
      const list = await this.labelDao.findLabel(ids);
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

  async updateLabels(body: UpdateLabelReqDto): Promise<UpdateLabelResDto> {
    try {
      if (body.add && body.add.length > 0) {
        await this.labelDao.addLabels(body.add);
      }
      if (body.delete && body.delete.length > 0) {
        await this.labelDao.deleteLabels(body.delete);
      }

      return {
        success: true,
      }
    } catch (error) {
      return {
        success: false,
        message: error
      }
    }
  }
}
