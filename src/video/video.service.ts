import { Injectable } from '@nestjs/common';
import { VideoDao } from './video.dao';
import { AddVideoReqDto, AddVideoResDto, UpdateVideoReqDto, UpdateVideoResDto, VideoDetailResDto, VideoListReqDto, VideoListResDto } from './video.dto';
import { FileService } from '../file/file.service';

@Injectable()
export class VideoService {
  constructor(
    private videoDao: VideoDao,
    private fileService: FileService
  ) {}

  async findAllVideo(query: VideoListReqDto): Promise<VideoListResDto> {
    try {
      const list = await this.videoDao.findVideo(query);
      const total = await this.videoDao.findVideoCount();
      return {
        success: true,
        list: list,
        total: total
      }
    } catch (error) {
      return {
        success: false,
        message: error
      }
    }
  }

  async findVideoById(id: number): Promise<VideoDetailResDto> {
    try {
      const Video = await this.videoDao.findVideoById(id);
      return {
        success: true,
        data: Video
      }
    } catch (error) {
      return {
        success: false,
        message: error
      }
    }
  }

  async addVideo(video: AddVideoReqDto): Promise<AddVideoResDto> {
    try {
       const result = await this.videoDao.addVideo(video);
       return {
        success: true,
        data: result
       }
    } catch (error) {
      return {
        success: false,
        message: error
      }
    }
  }

  async updateVideo(video: UpdateVideoReqDto): Promise<UpdateVideoResDto> {
    try {
      await this.videoDao.updateVideo(video);
      return {
        success: true,
      }
   } catch (error) {
     return {
       success: false,
       message: error
     }
   }
  }

  async deleteVideo(id: number): Promise<UpdateVideoResDto> {
    try {
      const { video_src, video_poster } = await this.videoDao.findVideoById(id);
      await this.fileService.cosDelete([
        video_src.split('.com/')[1],
        video_poster.split('.com/')[1]
      ]);
      await this.videoDao.deleteVideo(id);
      return {
        success: true,
      }
   } catch (error) {
     return {
       success: false,
       message: error
     }
   }
  }
}
