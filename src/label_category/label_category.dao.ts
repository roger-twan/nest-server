import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LabelCategoryEntity } from './label_category.entity';

@Injectable()
export class LabelCategoryDao {
  constructor(
    @InjectRepository(LabelCategoryEntity)
    private labelCategoryEntity: Repository<LabelCategoryEntity>,
  ) {}

  findLabelCategory(): Promise<LabelCategoryEntity[]> {
    return this.labelCategoryEntity.find();
  }
}
