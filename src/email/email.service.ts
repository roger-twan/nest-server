import { Injectable } from '@nestjs/common';
import * as tencentcloud from 'tencentcloud-sdk-nodejs'
import { ConfigService } from '@nestjs/config';
import { AccountService } from 'src/account/account.service';

const SesClient = tencentcloud.ses.v20201002.Client

@Injectable()
export class EmailService {
  constructor(
    private configService: ConfigService,
    private accountService: AccountService

  ) {}
  private sesClient = new SesClient({
    credential: {
      secretId: this.configService.get<string>('TENCENT_CLOUD_SECRET_ID'),
      secretKey: this.configService.get<string>('TENCENT_CLOUD_SECRET_KEY'),
    },
    region: 'ap-guangzhou',
  })


  async sendResumeNotifyEmail(
    applicationId: number,
    jobName: string,
    jobCompanyId: number,
  ): Promise<void> {
    const emails = await this.accountService.findAccountEmailsByCompanyId(jobCompanyId)
    this.sesClient.SendEmail({
      FromEmailAddress: this.configService.get<string>('EMAIL_SEND_ADDRESS'),
      Destination: emails,
      Subject: '简历投递通知',
      TriggerType: 1,
      Template: {
        TemplateID: Number(this.configService.get<string>('EMAIL_TEMPLATE_ID')),
        TemplateData: JSON.stringify({
          job: jobName,
          path: '/application-management/detail?id=' + applicationId,
          datetime: '',
        })
      }
    }).then((data) => {
      console.log(data)
    }).catch((err) => {
      console.log(err)
    })
  }
}
