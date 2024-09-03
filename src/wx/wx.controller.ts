import { Controller, Get, Post, Query, UseInterceptors, UploadedFile, ParseFilePipeBuilder, BadRequestException, Body } from '@nestjs/common';
import { ApiTags, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { BannerListResDto } from 'src/banner/banner.dto';
import { BannerService } from 'src/banner/banner.service';
import { Public } from 'src/_decorator/public.decorator';
import { MenuService } from 'src/menu/menu.service';
import { MenuListResDto } from 'src/menu/menu.dto';
import { PageDetailReqDto, PageDetailResDto } from 'src/page/page.dto';
import { PageService } from 'src/page/page.service';
import { CompanyDetailReqDto, CompanyDetailResDto, CompanySimpleListResDto } from 'src/company/company.dto';
import { CompanyService } from 'src/company/company.service';
import { JobDetailReqDto, JobDetailResDto, JobListReqDto, JobListResDto } from 'src/job/job.dto';
import { JobService } from 'src/job/job.service';
import { LabelService } from 'src/label/label.service';
import { LabelListResDto } from 'src/label/label.dto';
import { Purpose, UploadFileReqDto, UploadFileResDto } from 'src/file/file.dto';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { FileService } from 'src/file/file.service';
import { AuthReqDto, AuthResDto, CheckApplicableAndResDto, CheckApplicableReqDto } from './wx.dto';
import { WxService } from './wx.service';
import { AddApplicationReqDto, AddApplicationResDto } from 'src/application/application.dto';
import { ApplicationService } from 'src/application/application.service';
import { Weixin } from 'src/_decorator/weixin.decorator';

@ApiTags('Wx')
@Controller('wx')
@Weixin()
export class WxController {
  constructor(
    private wxService: WxService,
    private bannerService: BannerService,
    private menuService: MenuService,
    private pageService: PageService,
    private companyService: CompanyService,
    private jobService: JobService,
    private labelService: LabelService,
    private fileService: FileService,
    private applicationService: ApplicationService
  ) {}

  @Get('banner_list')
  async getBannerList(): Promise<BannerListResDto> {
    return this.bannerService.findAllBanner({
      status: 1,
      page: 1,
      page_size: 100
    });
  }

  @Get('menu_list')
  async getMenuList(): Promise<MenuListResDto> {
    return this.menuService.findAllMenu({
      status: 1,
      page: 1,
      page_size: 100
    });
  }

  @Get('page_detail')
  async getPageDetail(@Query() query: PageDetailReqDto): Promise<PageDetailResDto> {
    return this.pageService.getPageDetail(query);
  }

  @Get('company_list')
  async getCompanyList(): Promise<CompanySimpleListResDto> {
    return this.companyService.findAllCompanySimple({
      page: 1,
      page_size: 100
    });
  }

  @Get('company_detail')
  async getCompanyDetail(@Query() query: CompanyDetailReqDto): Promise<CompanyDetailResDto> {
    return this.companyService.findCompanyById(query.id);
  }

  @Get('job_list')
  getJobList(@Query() query: JobListReqDto): Promise<JobListResDto> {
    return this.jobService.findAllJob(query);
  }


  @Get('job_detail')
  async getJobDetail(@Query() query: JobDetailReqDto): Promise<JobDetailResDto> {
    return this.jobService.findJobById(query.id);
  }

  @Get('label_list')
  getLabelList(): Promise<LabelListResDto> {
    return this.labelService.findLabel();
  }

  @Post('upload_resume')
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UploadFileReqDto })
  @UseInterceptors(FileInterceptor('file'))
  uploadResume(
    @UploadedFile(
      new ParseFilePipeBuilder()
      .addFileTypeValidator({
        fileType: 'application/pdf|application/msword|application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      })
      .addMaxSizeValidator({
        maxSize: 1024 * 1024 * Number(process.env.IMAGE_FILE_MAX_SIZE_MB || 1)
      })
      .build({
        exceptionFactory: (error) => {
          if (error.includes('type')) {
            return new BadRequestException('仅支持上传pdf,doc,docx格式的图片')
          } else if (error.includes('size')) {
            return new BadRequestException(`文件大小不能超过${Number(process.env.IMAGE_FILE_MAX_SIZE_MB || 1)}MB`)
          }
        }
      }),
    ) file: Express.Multer.File,
    @Body('purpose') purpose: Purpose,
  ): Promise<UploadFileResDto> {
    return this.fileService.upload(file, purpose);
  }

  @Get('auth')
  async auth(@Query() query: AuthReqDto): Promise<AuthResDto> {
    return this.wxService.auth(query.code);
  }

  @Get('check_applicable')
  checkApplicable(@Query() body: CheckApplicableReqDto): Promise<CheckApplicableAndResDto> {
    return this.wxService.checkApplicable(body);
  }

  @Post('apply_job')
  applyJob(@Body() application: AddApplicationReqDto): Promise<AddApplicationResDto> {
    return this.applicationService.addApplication(application);
  }
}
