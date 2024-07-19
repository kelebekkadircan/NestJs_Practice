import { IsObject, IsOptional, IsString } from 'class-validator';

export class SendMailDto {
  @IsString()
  to: string;

  @IsString()
  subject: string;

  @IsString()
  template: string;

  @IsObject()
  // eslint-disable-next-line @typescript-eslint/ban-types
  context: Object;

  @IsString()
  @IsOptional()
  from?: string;
}
