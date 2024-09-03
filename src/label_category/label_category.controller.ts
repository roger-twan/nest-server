import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Role, Roles } from 'src/_decorator/role.decorator';
import { LabelCategoryListResDto } from './label_category.dto';
import { LabelCategoryService } from './label_category.service';

@ApiTags('LabelCategory')
@Controller('label_category')
export class LabelCategoryController {
  constructor(private labelCategoryService: LabelCategoryService) {}

  @Get('list')
  getList(): Promise<LabelCategoryListResDto> {
    return this.labelCategoryService.findLabelCategory();
  }
}
