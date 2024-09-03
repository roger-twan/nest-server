import { Injectable } from '@nestjs/common';
import { Purpose, UploadFileResDto } from './file.dto';
import * as COS from 'cos-nodejs-sdk-v5';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FileService {
  constructor(private configService: ConfigService) {}
  private cos = new COS({
    SecretId: this.configService.get<string>('TENCENT_CLOUD_SECRET_ID'),
    SecretKey: this.configService.get<string>('TENCENT_CLOUD_SECRET_KEY'),
  });

  private _cosUpload(file: Express.Multer.File, key: string): Promise<string> {
    return new Promise((resolve, reject) => {
      this.cos.putObject({
        Bucket: this.configService.get<string>('TENCENT_COS_BUCKET'),
        Region: this.configService.get<string>('TENCENT_COS_REGION'),
        Key: key,
        Body: file.buffer,
      }, (err, data) =>  err ? reject(err) : resolve(data.Location))
    })
  }

  async upload(file: Express.Multer.File, purpose: Purpose): Promise<UploadFileResDto> {
    try {
      const location = await this._cosUpload(file, `${purpose}/${Date.now()}${file.originalname.replaceAll(' ', '_')}`);
      return {
        success: true,
        url: 'https://' + location
      };
    } catch (error) {
      return {
        success: false,
        message: error,
      };
    }
  }

  cosDelete(keys: string[]): Promise<COS.DeleteMultipleObjectResult> {
    return new Promise((resolve, reject) => {
      this.cos.deleteMultipleObject({
        Bucket: this.configService.get<string>('TENCENT_COS_BUCKET'),
        Region: this.configService.get<string>('TENCENT_COS_REGION'),
        Objects: keys.map(key => ({ Key: key })),
      }, (err, data) => {
        return err ? reject(err) : resolve(data)
      })
    })
  }

  get(key: string): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      this.cos.getObject({
        Bucket: this.configService.get<string>('TENCENT_COS_BUCKET'),
        Region: this.configService.get<string>('TENCENT_COS_REGION'),
        Key: key
      }, (err, data) => {
        return err ? reject(err) : resolve(data.Body)
      })
    })
  }
}
