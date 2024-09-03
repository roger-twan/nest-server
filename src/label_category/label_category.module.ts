import { Module } from '@nestjs/common';
import { LabelCategoryController } from './label_category.controller';
import { LabelCategoryService } from './label_category.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LabelCategoryEntity } from './label_category.entity';
import { LabelCategoryDao } from './label_category.dao';

@Module({
  imports: [TypeOrmModule.forFeature([LabelCategoryEntity])],
  controllers: [LabelCategoryController],
  providers: [LabelCategoryService, LabelCategoryDao],
})

export class LabelCategoryModule {}
