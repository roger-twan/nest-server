import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { BannerService } from './banner.service';
import { ApiTags } from '@nestjs/swagger';
import { Role, Roles } from 'src/_decorator/role.decorator';
import { AddBannerReqDto, AddBannerResDto, BannerDetailReqDto, BannerDetailResDto, BannerListReqDto, BannerListResDto, DeleteBannerReqDto, SetBannerOrderReqDto, SetBannerTopReqDto, UpdateBannerReqDto, UpdateBannerResDto } from './banner.dto';

@ApiTags('Banner')
@Controller('banner')
export class BannerController {
  constructor(private bannerService: BannerService) {}

  @Roles(Role.Admin)
  @Get('list')
  getList(@Query() query: BannerListReqDto): Promise<BannerListResDto> {
    return this.bannerService.findAllBanner(query);
  }

  @Roles(Role.Admin)
  @Get('detail')
  getBannerById(@Query() query: BannerDetailReqDto): Promise<BannerDetailResDto> {
    return this.bannerService.findBannerById(query.id);
  }

  @Roles(Role.Admin)
  @Post('add')
  addBanner(@Body() banner: AddBannerReqDto): Promise<AddBannerResDto> {
    return this.bannerService.addBanner(banner);
  }

  @Roles(Role.Admin)
  @Post('update')
  updateBanner(@Body() banner: UpdateBannerReqDto): Promise<UpdateBannerResDto> {
    return this.bannerService.updateBanner(banner);
  }

  @Roles(Role.Admin)
  @Post('set_top')
  setBannerTop(@Body() body: SetBannerTopReqDto): Promise<UpdateBannerResDto> {
    return this.bannerService.setBannerTop(body.banner_id, body.banner_order);
  }

  @Roles(Role.Admin)
  @Post('set_order')
  setBannerOrder(@Body() body: SetBannerOrderReqDto): Promise<UpdateBannerResDto> {
    return this.bannerService.setBannerOrder(body.banner_id, body.banner_order, body.type);
  }

  @Roles(Role.Admin)
  @Post('delete')
  deleteBanner(@Body() body: DeleteBannerReqDto): Promise<UpdateBannerResDto> {
    return this.bannerService.deleteBanner(body.banner_id);
  }
}
