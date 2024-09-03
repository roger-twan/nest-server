import { BadRequestException, Body, Controller, Get, ParseFilePipeBuilder, Post, Query, StreamableFile, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApiTags, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { FileService } from './file.service';
import { Purpose, UploadFileReqDto, UploadFileResDto } from './file.dto';
import { FileInterceptor } from '@nestjs/platform-express/multer';

@ApiTags('File')
@Controller('file')
export class FileController {
  constructor( private fileService: FileService ) {}

  @Get('get')
  async get(@Query('key') key: string): Promise<StreamableFile> {
    const file = await this.fileService.get(key);
    return new StreamableFile(file);
  }

  @Post('upload_image')
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UploadFileReqDto })
  @UseInterceptors(FileInterceptor('file'))
  uploadImage(
    @UploadedFile(
      new ParseFilePipeBuilder()
      .addFileTypeValidator({
        fileType: 'image/png|image/jpeg|image/jpg',
      })
      .addMaxSizeValidator({
        maxSize: 1024 * 1024 * Number(process.env.IMAGE_FILE_MAX_SIZE_MB || 1)
      })
      .build({
        exceptionFactory: (error) => {
          if (error.includes('type')) {
            return new BadRequestException('仅支持上传png,jpg,jpeg格式的图片')
          } else if (error.includes('size')) {
            return new BadRequestException(`文件大小不能超过${Number(process.env.IMAGE_FILE_MAX_SIZE_MB || 1)}MB`)
          }
        }
      }),
    ) file: Express.Multer.File,
    @Body('purpose') purpose: Purpose,
  ): Promise<UploadFileResDto> {
    return this.fileService.upload(file, purpose);
  }

  @Post('upload_video')
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UploadFileReqDto })
  @UseInterceptors(FileInterceptor('file'))
  uploadVideo(
    @UploadedFile(
      new ParseFilePipeBuilder()
      .addFileTypeValidator({
        fileType: 'video/mp4',
      })
      .addMaxSizeValidator({
        maxSize: 1024 * 1024 * Number(process.env.VIDEO_FILE_MAX_SIZE_MB || 10)
      })
      .build({
        exceptionFactory: (error) => {
          if (error.includes('type')) {
            return new BadRequestException('仅支持上传mp4格式的视频')
          } else if (error.includes('size')) {
            return new BadRequestException(`文件大小不能超过${Number(process.env.VIDEO_FILE_MAX_SIZE_MB || 10)}MB`)
          }
        }
      }),
    ) file: Express.Multer.File,
    @Body('purpose') purpose: Purpose,
  ): Promise<UploadFileResDto> {
    return this.fileService.upload(file, purpose);
  }
}
