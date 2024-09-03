import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { VideoEntity } from './video.entity';
import { AddVideoReqDto, VideoListReqDto, UpdateVideoReqDto } from './video.dto';

@Injectable()
export class VideoDao {
  constructor(
    @InjectRepository(VideoEntity)
    private videoRepository: Repository<VideoEntity>,
  ) {}

  findVideo(query: VideoListReqDto): Promise<VideoEntity[]> {
    return this.videoRepository.find({
      skip: (query.page - 1) * query.page_size,
      take: query.page_size,
      order: { video_id: 'DESC' }
    });
  }

  findVideoCount(): Promise<number> {
    return this.videoRepository.count();
  }

  findVideoById(id: number): Promise<VideoEntity> {
    return this.videoRepository.findOneBy({ video_id: id });
  }

  async addVideo(body: AddVideoReqDto): Promise<VideoEntity> {
    const date = new Date();

    return this.videoRepository.save({
      video_src: body.video_src,
      video_title: body.video_title,
      video_name: body.video_name.replaceAll(' ', '_'),
      video_poster: body.video_poster,
      video_description: body.video_description,
      create_time: date,
      update_time: date,
    });
  }

  updateVideo(body: UpdateVideoReqDto): Promise<UpdateResult> {
    const data = {
      video_src: body.video_src,
      video_title: body.video_title,
      video_name: body.video_name,
      video_poster: body.video_poster,
      video_description: body.video_description,
      update_time: new Date(),
    }
    const filteredData = {};
    for (const key in data) {
      if (![undefined, null].includes(data[key])) {
        filteredData[key] = data[key];
      }
    }
    return this.videoRepository.update(body.video_id, filteredData);
  }

  deleteVideo(id: number): Promise<DeleteResult> {
    return this.videoRepository.delete(id);
  }
}
