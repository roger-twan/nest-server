import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common';
import { ApplicationService } from './application.service';
import { ApiTags } from '@nestjs/swagger';
import { AddApplicationReqDto, AddApplicationResDto, ApplicationDetailReqDto, ApplicationListReqDto, ApplicationListResDto, ApplicationDetailResDto, UpdateApplicationStatusReqDto, UpdateApplicationStatusResDto, DeleteApplicationReqDto, ApplicationSimpleListReqDto, ApplicationSimpleListResDto, ApplicationCountResDto } from './application.dto';

@ApiTags('Application')
@Controller('application')
export class ApplicationController {
  constructor(private applicationService: ApplicationService) {}

  @Get('list')
  getList(@Query() query: ApplicationListReqDto, @Req() req: Request): Promise<ApplicationListResDto> {
    return this.applicationService.findAllApplication(query, req.user);
  }

  @Get('get_count_by_status')
  getCountByStatus(@Query('status') status: string, @Req() req: Request): Promise<ApplicationCountResDto> {
    return this.applicationService.findApplicationCountByStatus(status, req.user);
  }

  @Get('simple_list')
  getSimpleList(@Query() query: ApplicationSimpleListReqDto): Promise<ApplicationSimpleListResDto> {
    return this.applicationService.findSimpleApplication(query);
  }

  @Get('detail')
  getApplicationById(@Query() query: ApplicationDetailReqDto): Promise<ApplicationDetailResDto> {
    return this.applicationService.findApplicationById(query.id);
  }

  @Post('update')
  updateApplication(@Body() application: UpdateApplicationStatusReqDto): Promise<UpdateApplicationStatusResDto> {
    return this.applicationService.updateApplication(application);
  }

  @Post('delete')
  deleteApplication(@Body() body: DeleteApplicationReqDto): Promise<UpdateApplicationStatusResDto> {
    return this.applicationService.deleteApplication(body.ids);
  }
}
