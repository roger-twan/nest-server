import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { PageService } from './page.service';
import { ApiTags } from '@nestjs/swagger';
import { Role, Roles } from 'src/_decorator/role.decorator';
import { AddPageReqDto, AddPageResDto, PageDetailReqDto, PageDetailResDto, PageListReqDto, PageListResDto, DeletePageReqDto, UpdatePageReqDto, UpdatePageResDto, PageSimpleListResDto } from './page.dto';

@ApiTags('Page')
@Controller('page')
export class PageController {
  constructor(private pageService: PageService) {}

  @Roles(Role.Admin)
  @Get('list')
  getList(@Query() query: PageListReqDto): Promise<PageListResDto> {
    return this.pageService.findAllPage(query);
  }

  @Roles(Role.Admin)
  @Get('simple_list')
  getSimpleList(): Promise<PageSimpleListResDto> {
    return this.pageService.findAllSimplePage();
  }

  @Roles(Role.Admin)
  @Get('detail')
  getPageDetail(@Query() query: PageDetailReqDto): Promise<PageDetailResDto> {
    return this.pageService.getPageDetail(query);
  }

  @Roles(Role.Admin)
  @Post('add')
  addPage(@Body() page: AddPageReqDto): Promise<AddPageResDto> {
    return this.pageService.addPage(page);
  }

  @Roles(Role.Admin)
  @Post('update')
  updatePage(@Body() page: UpdatePageReqDto): Promise<UpdatePageResDto> {
    return this.pageService.updatePage(page);
  }

  @Roles(Role.Admin)
  @Post('delete')
  deletePage(@Body() body: DeletePageReqDto): Promise<UpdatePageResDto> {
    return this.pageService.deletePage(body.page_id);
  }
}
