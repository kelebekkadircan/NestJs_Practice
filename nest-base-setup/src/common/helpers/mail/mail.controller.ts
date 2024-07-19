/*
https://docs.nestjs.com/controllers#controllers
*/

import { SkipAuth } from '@app/common/decorators/skip-auth.decorator';
import { Body, Controller, Post } from '@nestjs/common';
import { MailService } from './mail.service';
import { ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('Future Integration')
export class MailController {
  constructor(private readonly MailService: MailService) {}

  @SkipAuth()
  @Post('example-mail-endpoint')
  async sendMail(
    @Body()
    data: {
      from: string;
      to: string;
      subject: string;
      context: Object;
    },
  ) {
    await this.MailService.sendMail({
      ...data,
      template: 'example',
      context: { ...data.context, exampleText: 'This is an example text!' },
    });
  }
}
