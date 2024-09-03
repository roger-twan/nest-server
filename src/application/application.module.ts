import { Module } from '@nestjs/common';
import { ApplicationController } from './application.controller';
import { ApplicationService } from './application.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationEntity } from './application.entity';
import { ApplicationDao } from './application.dao';
import { JobModule } from 'src/job/job.module';
import { CompanyModule } from 'src/company/company.module';
import { AccountModule } from 'src/account/account.module';
import { EmailModule } from 'src/email/email.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ApplicationEntity]),
    JobModule,
    CompanyModule,
    AccountModule,
    EmailModule,
  ],
  controllers: [ApplicationController],
  providers: [ApplicationService, ApplicationDao],
  exports: [ApplicationService],
})

export class ApplicationModule {}
