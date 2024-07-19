import { IsEmail, IsString } from 'class-validator';

export class ConfirmResetPasswordDto {
  @IsEmail()
  email: string;

  @IsString()
  code: string;
}
