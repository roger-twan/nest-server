import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { VideoService } from './video.service';
import { ApiTags } from '@nestjs/swagger';
import { Role, Roles } from 'src/_decorator/role.decorator';
import { AddVideoReqDto, AddVideoResDto, VideoDetailReqDto, VideoDetailResDto, VideoListReqDto, VideoListResDto, DeleteVideoReqDto, UpdateVideoReqDto, UpdateVideoResDto } from './video.dto';

@ApiTags('Video')
@Controller('video')
export class VideoController {
  constructor(private videoService: VideoService) {}

  @Roles(Role.Admin)
  @Get('list')
  getList(@Query() query: VideoListReqDto): Promise<VideoListResDto> {
    return this.videoService.findAllVideo(query);
  }

  @Roles(Role.Admin)
  @Get('detail')
  getVideoById(@Query() query: VideoDetailReqDto): Promise<VideoDetailResDto> {
    return this.videoService.findVideoById(query.id);
  }

  @Roles(Role.Admin)
  @Post('add')
  addVideo(@Body() video: AddVideoReqDto): Promise<AddVideoResDto> {
    return this.videoService.addVideo(video);
  }

  @Roles(Role.Admin)
  @Post('update')
  updateVideo(@Body() video: UpdateVideoReqDto): Promise<UpdateVideoResDto> {
    return this.videoService.updateVideo(video);
  }

  @Roles(Role.Admin)
  @Post('delete')
  deleteVideo(@Body() body: DeleteVideoReqDto): Promise<UpdateVideoResDto> {
    return this.videoService.deleteVideo(body.video_id);
  }
}
