import { Module } from '@nestjs/common';
import { VideoController } from './video.controller';
import { VideoService } from './video.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VideoEntity } from './video.entity';
import { VideoDao } from './video.dao';
import { FileModule } from '../file/file.module';

@Module({
  imports: [TypeOrmModule.forFeature([VideoEntity]), FileModule],
  controllers: [VideoController],
  providers: [VideoService, VideoDao],
  exports: [VideoService]
})

export class VideoModule {}
