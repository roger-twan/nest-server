import { Injectable } from '@nestjs/common';
import { AuthResDto, CheckApplicableAndResDto, CheckApplicableReqDto } from './wx.dto';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ApplicationService } from 'src/application/application.service';

@Injectable()
export class WxService {
  constructor(
    private configService: ConfigService,
    private httpService: HttpService,
    private applicationService: ApplicationService
  ) {}
  
  async auth(code: string): Promise<AuthResDto> {
    const url = 'https://api.weixin.qq.com/sns/jscode2session'
    const res = await firstValueFrom(this.httpService.get(url, {
      params: {
        appid: this.configService.get('MP_APP_ID'),
        secret: this.configService.get('MP_APP_SECRET'),
        js_code: code,
        grant_type: 'authorization_code'
      }
    }))

    if (res.data.errcode) {
      return {
        success: false,
        message: res.data.errmsg
      }
    } else {
      return {
        success: true,
        openid: res.data.openid
      }
    }
  }

  async checkApplicable(req: CheckApplicableReqDto): Promise<CheckApplicableAndResDto> {
    let minDate = new Date();
    minDate.setDate(minDate.getDate() - Number(this.configService.get('APPLY_INTERVAL_DAYS') || 7 ))
    const applications = await this.applicationService.findAllApplication({
      openid: req.openid,
      page: 1,
      page_size: 100,
      min_date: minDate,
      job_id: req.job_id.toString()
    })
    return {
      success: true,
      applicable: applications.total === 0
    }
  }
}
