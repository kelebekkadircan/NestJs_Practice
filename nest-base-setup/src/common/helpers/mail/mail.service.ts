/*
https://docs.nestjs.com/providers#services
*/

import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer';
import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
  constructor(
    private mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}

  async sendMail(data: ISendMailOptions): Promise<void> {
    const { to, from, subject, template, context } = data;
    const sendMailOptions: ISendMailOptions = {
      to,
      from: from ? from : this.configService.get<string>('MAIL_FROM'),
      subject,
      template,
      context,
    };

    await this.mailerService
      .sendMail(sendMailOptions)
      .then((res) => {
        console.log('Mail gönderildi!');
        console.log({ res });
      })
      .catch((err) => {
        console.log('Mail gönderilemedi!');
        console.log({ err });
        throw new ServiceUnavailableException(err);
      });
  }
}
