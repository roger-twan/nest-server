import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { LabelService } from './label.service';
import { ApiTags } from '@nestjs/swagger';
import { Role, Roles } from 'src/_decorator/role.decorator';
import { LabelListReqDto, LabelListResDto, UpdateLabelReqDto, UpdateLabelResDto } from './label.dto';

@ApiTags('Label')
@Controller('label')
export class LabelController {
  constructor(private labelService: LabelService) {}

  @Get('list')
  getList(@Query() query: LabelListReqDto): Promise<LabelListResDto> {
    return this.labelService.findLabel(query);
  }

  @Roles(Role.Admin)
  @Post('update')
  addLabels(@Body() body: UpdateLabelReqDto): Promise<UpdateLabelResDto> {
    return this.labelService.updateLabels(body);
  }
}
