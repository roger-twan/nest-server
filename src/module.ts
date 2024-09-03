import { Module } from '@nestjs/common';
import { GlobalModule } from './global.module';
import { AuthGuard } from './_guard/auth.guard';
import { RoleGuard } from './_guard/role.guard';
import { AuthModule } from './auth/auth.module';
import { BannerModule } from './banner/banner.module';
import { FileModule } from './file/file.module';
import { VideoModule } from './video/video.module';
import { CompanyModule } from './company/company.module';
import { LabelModule } from './label/label.module';
import { LabelCategoryModule } from './label_category/label_category.module';
import { JobModule } from './job/job.module';
import { ApplicationModule } from './application/application.module';
import { MenuModule } from './menu/menu.module';
import { PageModule } from './page/page.module';
import { WxModule } from './wx/wx.module';
import { EmailModule } from './email/email.module';

@Module({
  imports: [
    GlobalModule,
    AuthModule,
    BannerModule,
    FileModule,
    VideoModule,
    CompanyModule,
    LabelModule,
    LabelCategoryModule,
    JobModule,
    ApplicationModule,
    MenuModule,
    PageModule,
    WxModule,
    EmailModule,
  ],
  providers: [
    {
      provide: 'APP_GUARD',
      useClass: AuthGuard,
    },
    {
      provide: 'APP_GUARD',
      useClass: RoleGuard,
    },
  ],
})

export class AppModule {}
