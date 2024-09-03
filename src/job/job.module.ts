import { Module } from '@nestjs/common';
import { JobController } from './job.controller';
import { JobService } from './job.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobEntity } from './job.entity';
import { JobDao } from './job.dao';
import { AccountModule } from 'src/account/account.module';

@Module({
  imports: [TypeOrmModule.forFeature([JobEntity]), AccountModule],
  controllers: [JobController],
  providers: [JobService, JobDao],
  exports: [JobService],
})

export class JobModule {}
