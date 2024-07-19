import { Catch, ArgumentsHost } from '@nestjs/common';
import { ThrottlerException } from '@nestjs/throttler';
import { HttpExceptionFilter } from './handle-all-exception';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { I18nContext } from 'nestjs-i18n';

@Catch(ThrottlerException)
export class ThrottlerExceptionFilter extends HttpExceptionFilter {
  constructor(public configService: ConfigService) {
    super(configService);
  }

  catch(exception: ThrottlerException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const i18n = I18nContext.current(host);

    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    const errorMessage = i18n.t('common.throttler.tooManyRequests');
    const errorResponse = this.getErrorResponse(status, errorMessage, request, exception);
    return response.status(status).json(errorResponse);
  }
}
