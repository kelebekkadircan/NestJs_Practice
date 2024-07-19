import { Body, ClassSerializerInterceptor, Controller, Get, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserModel } from '../../user/entities/user.entity';
import { PromiseResponse } from '@app/common/interfaces';
import { AuthService } from '../services/auth.service';
import { LoginDto } from '../dtos/login.dto';
import { RegisterDto } from '../dtos/register.dto';
import { User } from '@app/common/decorators/user.decorator';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { LoginResponse } from '../interfaces/login-response.interface';
import { SkipAuth } from '@app/common/decorators/skip-auth.decorator';
import { JwtRefreshAuthGuard } from '@app/common/guards/jwt-refresh-auth.guard';
import { RefreshDto } from '../dtos/refresh.dto';
import { RefreshResponse } from '../interfaces/refresh-response.interface';
import { ForgotPasswordDto } from '../dtos/forgot-password.dto';
import { ResetPasswordDto } from '../dtos/reset-password.dto';
import { ConfirmResetPasswordDto } from '../dtos/confirm-reset-password.dto';
import { Throttle } from '@nestjs/throttler';

@Controller({ path: 'auth', version: '1' })
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @SkipAuth()
  @ApiSecurity({})
  @Post('/login')
  async login(@Body() data: LoginDto) {
    return { success: true, data: await this.authService.login(data) };
  }

  @SkipAuth()
  @ApiSecurity({})
  @Throttle({ long: { limit: 500, ttl: 60000 * 60 } })
  @Post('/register')
  async register(@Body() data: RegisterDto): PromiseResponse<UserModel> {
    return { success: true, data: await this.authService.register(data) };
  }

  @SkipAuth()
  @ApiSecurity({})
  @UseGuards(JwtRefreshAuthGuard)
  @Post('/refresh')
  async refresh(@Body() data: RefreshDto): PromiseResponse<RefreshResponse> {
    return { success: true, data: await this.authService.refresh(data) };
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/me')
  async me(@User() user: UserModel): PromiseResponse<UserModel> {
    return { success: true, data: await this.authService.me(user.id) };
  }

  @SkipAuth()
  @ApiSecurity({})
  @Throttle({ long: { limit: 500, ttl: 60000 * 60 } })
  @Post('forgot-password')
  async forgotPassword(@Body() data: ForgotPasswordDto): PromiseResponse<void> {
    return { success: true, data: await this.authService.forgotPassword(data.email) };
  }

  @SkipAuth()
  @ApiSecurity({})
  @Post('confirm-reset-password-code')
  async confirmResetPassCode(@Body() data: ConfirmResetPasswordDto): PromiseResponse<{}> {
    return { success: true, data: await this.authService.confirmResetPassCode(data) };
  }

  @SkipAuth()
  @ApiSecurity({})
  @Post('reset-password')
  async resetPassword(@Body() data: ResetPasswordDto): PromiseResponse<void> {
    return { success: true, data: await this.authService.resetPassword(data) };
  }
}
