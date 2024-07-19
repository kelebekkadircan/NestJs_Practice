import { OmitType } from '@nestjs/mapped-types';
import { SendMailDto } from './send-mail';
import { IsObject } from 'class-validator';

export class sendMailWithAttachment extends OmitType(SendMailDto, [] as const) {
  @IsObject()
  attachment: {
    content: Buffer;
    filename: string;
  };
}
