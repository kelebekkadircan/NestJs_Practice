import 'dotenv/config';
import { I18nContext } from 'nestjs-i18n';
import { Request, Response } from 'express';
import { ConfigService } from '@nestjs/config';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
} from '@nestjs/common';

import { CusttomHttpExceptionResponse } from '@common/interfaces/responses/http-exception-response.interface';
import {
  I18nHttpException,
  I18nHttpExceptionResponse,
} from '@common/exceptions/custom/i18n-http-exception';
import { ThrottlerException } from '@nestjs/throttler';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(protected configService: ConfigService) {}
  public isProduction = this.configService.get('NODE_ENV') === 'production';

  catch(exception: unknown, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const i18n = I18nContext.current(host);
    let status: HttpStatus;
    let errorMessage: unknown;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      exception.message = this.sendNotFoundErrorIfCannotGetResponse(
        exception.message,
      );
      errorMessage = this.translateErrorMessage(i18n, exception);
    }

    if (
      !(exception instanceof HttpException) &&
      !(exception instanceof ThrottlerException)
    ) {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      errorMessage = 'Critical internal server error occured';
    }

    const errorResponse = this.getErrorResponse(
      status,
      errorMessage,
      request,
      exception,
    );
    this.getErrorLog(errorResponse, request, exception);
    return response.status(status).json(errorResponse);
  }

  protected getErrorResponse = (
    status: HttpStatus,
    errorMessage: unknown,
    request: Request,
    exception: any,
  ): CusttomHttpExceptionResponse => ({
    success: false,
    error: { message: errorMessage, statusCode: status },
    path: request.url,
    method: request.method,
    timeStamp: new Date(),
    errorStack: this.isProduction ? undefined : exception.stack,
  });

  protected getErrorLog = (
    errorResponse: CusttomHttpExceptionResponse,
    request: Request,
    exception: unknown,
  ): string => {
    const { error } = errorResponse;
    const { statusCode } = error;
    const { method, url } = request;
    const errorLog = `Status code: ${statusCode} - Method: ${method} - Url: ${url}\n\n
    User: ${JSON.stringify(request.user ?? 'Not signed in')}\n\n
    ${exception instanceof HttpException ? exception.stack : error}`;
    console.log(errorLog);
    return errorLog;
  };

  protected translateErrorMessage = (
    i18n: I18nContext,
    exception: unknown | any,
  ): unknown => {
    let exceptionMessage = exception.getResponse().message;

    if (i18n?.service && exception instanceof HttpException) {
      const exceptionResponse = exception.getResponse();
      const translatedMessage = this.translateMessageAccordingToHttpException(
        exception,
        i18n,
      );
      if (
        translatedMessage !== exception.message &&
        exceptionResponse instanceof Object &&
        exceptionResponse.hasOwnProperty('message')
      ) {
        exceptionMessage = translatedMessage;
      }
    }

    if (!i18n?.service && exception instanceof HttpException) {
      exceptionMessage = 'This EP does not exist"';
    }
    return exceptionMessage;
  };

  private translateMessageAccordingToHttpException = (
    exception: HttpException,
    i18n: I18nContext,
  ): unknown => {
    const exceptionResponse = exception.getResponse();

    if (
      typeof exceptionResponse === 'object' &&
      'message' in exceptionResponse
    ) {
      return this.isArray(exceptionResponse, i18n, exception);
    }
  };

  private isArray = (
    exceptionResponse: any,
    i18n: I18nContext,
    exception: HttpException,
  ): boolean => {
    if (Array.isArray(exceptionResponse.message)) {
      exceptionResponse.message = exceptionResponse.message.map(
        (arg: string) => {
          return i18n.t(arg);
        },
      );
    } else {
      return exception instanceof I18nHttpException
        ? i18n.t(exception.message, {
            args: (exceptionResponse as I18nHttpExceptionResponse).args,
          })
        : i18n.t(exception.message);
    }

    return exceptionResponse.message;
  };

  private sendNotFoundErrorIfCannotGetResponse = (message: string) => {
    const NOT_FOUND_MESSAGE = 'common.epNotFound';
    const messageIncludesCannotGet = message.includes('Cannot');
    if (messageIncludesCannotGet) {
      return NOT_FOUND_MESSAGE;
    }
    return message;
  };
}
