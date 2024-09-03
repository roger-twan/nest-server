import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { AccountModule } from 'src/account/account.module';

@Module({
  imports: [AccountModule],
  providers: [EmailService],
  exports: [EmailService]
})

export class EmailModule {}
