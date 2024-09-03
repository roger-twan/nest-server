import { Module } from '@nestjs/common';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyEntity } from './company.entity';
import { CompanyDao } from './company.dao';
import { AccountModule } from 'src/account/account.module';

@Module({
  imports: [TypeOrmModule.forFeature([CompanyEntity]), AccountModule],
  controllers: [CompanyController],
  providers: [CompanyService, CompanyDao],
  exports: [CompanyService]
})

export class CompanyModule {}
