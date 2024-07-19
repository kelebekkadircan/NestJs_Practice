import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UserService } from '../../user/services/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserModel } from '../../user/entities/user.entity';
import { LoginDto } from '../dtos/login.dto';
import { RegisterDto } from '../dtos/register.dto';
import { ValidateUser } from '../interfaces/validate-user.interface';
import { LoginResponse } from '../interfaces/login-response.interface';
import { RefreshDto } from '../dtos/refresh.dto';
import { RefreshResponse } from '../interfaces/refresh-response.interface';
import { ConfigService } from '@nestjs/config';
import { MailService } from '@app/common/helpers/mail/mail.service';
import { I18nHttpException } from '@app/common/exceptions/custom/i18n-http-exception';
import { ConfirmResetPasswordDto } from '../dtos/confirm-reset-password.dto';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { CharacterSets, generateRandomCode } from '@app/common/helpers/generators/code-generator';
import { ResetPasswordDto } from '../dtos/reset-password.dto';
import { EntityManager } from 'typeorm';

@Injectable()
export class AuthService {
  private readonly BCRYPT_SALT_ROUND = 10;
  private readonly ACCESS_TOKEN_EXPIRES_IN = '15m';
  private readonly REFRESH_TOKEN_EXPIRES_IN = '7d';
  private readonly MINUTE = 1000 * 60;
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private mailService: MailService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async validateUser(email: string, password: string): Promise<ValidateUser> {
    const user = await this.userService.findOneBy({ where: { email } });
    if (!user) {
      throw new NotFoundException('auth.password.invalid');
    }
    const compareResult = await bcrypt.compare(password, user.password);
    if (!compareResult) {
      throw new BadRequestException('auth.password.invalid');
    }

    return { id: user.id, email: user.email };
  }

  async me(id: string): Promise<UserModel> {
    const user = await this.userService.findOne(id);
    if (!user) {
      throw new NotFoundException('common.user.notFound');
    }
    return user;
  }

  async login(loginData: LoginDto): Promise<LoginResponse> {
    const record = await this.validateUser(loginData.email, loginData.password);
    const payload = { id: record.id, email: record.email };
    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_SECRET'),
      expiresIn: this.ACCESS_TOKEN_EXPIRES_IN,
    });
    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_SECRET_REFRESH'),
      expiresIn: this.REFRESH_TOKEN_EXPIRES_IN,
    });
    return { accessToken, refreshToken };
  }

  async register(registerData: RegisterDto): Promise<UserModel> {
    const user = await this.userService.findOneBy({ where: { email: registerData.email } });
    if (user) {
      throw new BadRequestException('common.user.alreadyExist');
    }

    const salt = bcrypt.genSaltSync(this.BCRYPT_SALT_ROUND);
    const hashedPassword = bcrypt.hashSync(registerData.password, salt);

    return await this.userService.create({
      email: registerData.email,
      password: hashedPassword,
    });
  }

  async refresh(refreshData: RefreshDto): Promise<RefreshResponse> {
    const record = await this.jwtService.verifyAsync(refreshData.refreshToken, { secret: this.configService.get<string>('JWT_SECRET_REFRESH') });
    const payload = { id: record.id, email: record.email };
    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_SECRET'),
      expiresIn: this.ACCESS_TOKEN_EXPIRES_IN,
    });
    return { accessToken };
  }

  async forgotPassword(email: string): Promise<void> {
    const user = await this.userService.findOneBy({ where: { email } });
    if (!user) {
      throw new I18nHttpException('auth.user.not.found', 404);
    }
    const generatedCode = generateRandomCode(6, CharacterSets.Numeric);
    await this.mailService.sendMail({
      to: user.email,
      subject: 'Password reset for Atoly-e!',
      template: 'password-reset',
      context: { code: generatedCode },
    });
    await this.cacheManager.set(`password-code-for-check-${user.id}`, generatedCode, this.MINUTE * 2);
  }

  async confirmResetPassCode(data: ConfirmResetPasswordDto): Promise<{ token: string }> {
    const user = await this.userService.findOneBy({ where: { email: data.email } });
    if (!user) {
      throw new I18nHttpException('auth.user.not.found', 404);
    }
    const isUserCacheCodeExist = await this.cacheManager.get(`password-code-for-check-${user.id}`);
    if (!isUserCacheCodeExist) {
      throw new I18nHttpException('auth.code.expired', 400);
    }
    if(isUserCacheCodeExist !== data.code){
      throw new I18nHttpException('auth.code.wrong', 400);
    }
    await this.cacheManager.del(`password-code-for-check-${user.id}`);
    const token = this.jwtService.sign({ id: user.id }, { secret: this.configService.get<string>('JWT_SECRET'), expiresIn: this.MINUTE * 60 });
    return { token };
  }

  async resetPassword(data: ResetPasswordDto): Promise<void> {
    const payload = await this.jwtService.verifyAsync(data.token, { secret: this.configService.get<string>('JWT_SECRET') });
    if (!payload['id']) {
      throw new I18nHttpException('auth.token.invalid', 400);
    }
    const user = await this.userService.findOne(payload.id);
    if (!user) {
      throw new I18nHttpException('auth.user.not.found', 404);
    }
    const salt = bcrypt.genSaltSync(this.BCRYPT_SALT_ROUND);
    const isPasswordIsSame = bcrypt.compareSync(data.password, user.password);
    if (isPasswordIsSame) {
      throw new I18nHttpException('auth.password.same', 400);
    }
    const hashedPassword = bcrypt.hashSync(data.password, salt);
    await this.userService.update(user.id, { password: hashedPassword });
  }
}
