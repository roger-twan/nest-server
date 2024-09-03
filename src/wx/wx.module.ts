import { Module } from '@nestjs/common';
import { WxController } from './wx.controller';
import { WxService } from './wx.service';
import { BannerModule } from 'src/banner/banner.module';
import { MenuModule } from 'src/menu/menu.module';
import { PageModule } from 'src/page/page.module';
import { CompanyModule } from 'src/company/company.module';
import { JobModule } from 'src/job/job.module';
import { LabelModule } from 'src/label/label.module';
import { FileModule } from 'src/file/file.module';
import { HttpModule } from '@nestjs/axios';
import { ApplicationModule } from 'src/application/application.module';

@Module({
  imports: [
    BannerModule,
    MenuModule,
    PageModule,
    CompanyModule,
    JobModule,
    LabelModule,
    FileModule,
    HttpModule,
    ApplicationModule
  ],
  controllers: [WxController],
  providers: [WxService],
})

export class WxModule {}
