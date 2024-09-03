import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common';
import { CompanyService } from './company.service';
import { ApiTags } from '@nestjs/swagger';
import { Role, Roles } from 'src/_decorator/role.decorator';
import { AddCompanyReqDto, AddCompanyResDto, CompanyDetailReqDto, CompanyDetailResDto, CompanyListReqDto, CompanyListResDto, CompanySimpleListResDto, DeleteCompanyReqDto, SetCompanyTopReqDto, UpdateCompanyReqDto, UpdateCompanyResDto } from './company.dto';

@ApiTags('Company')
@Controller('company')
export class CompanyController {
  constructor(private companyService: CompanyService) {}

  @Get('list')
  getList(@Query() query: CompanyListReqDto, @Req() req: Request): Promise<CompanyListResDto> {
    return this.companyService.findAllCompany(query, req.user);
  }

  @Get('simple_list')
  getSimpleList(@Query() query: CompanyListReqDto, @Req() req: Request): Promise<CompanySimpleListResDto> {
    return this.companyService.findAllCompanySimple(query, req.user);
  }

  @Get('detail')
  getCompanyById(@Query() query: CompanyDetailReqDto): Promise<CompanyDetailResDto> {
    return this.companyService.findCompanyById(query.id);
  }

  @Roles(Role.Admin)
  @Post('add')
  addCompany(@Body() company: AddCompanyReqDto): Promise<AddCompanyResDto> {
    return this.companyService.addCompany(company);
  }

  @Post('update')
  updateCompany(@Body() company: UpdateCompanyReqDto): Promise<UpdateCompanyResDto> {
    return this.companyService.updateCompany(company);
  }

  @Roles(Role.Admin)
  @Post('set_top')
  setCompanyTop(@Body() body: SetCompanyTopReqDto): Promise<UpdateCompanyResDto> {
    return this.companyService.setCompanyTop(body.company_id);
  }

  @Roles(Role.Admin)
  @Post('delete')
  deleteCompany(@Body() body: DeleteCompanyReqDto): Promise<UpdateCompanyResDto> {
    return this.companyService.deleteCompany(body.company_id);
  }
}
