import { HttpException } from '@nestjs/common';
import { Request } from 'express'; // Express Request tipini ekleyin

type ArgsType =
  | (
      | string
      | {
          [k: string]: any;
        }
    )[]
  | {
      [k: string]: any;
    };

export interface CustomHttpExceptionOptions {
  cause?: unknown;
  description?: string;
  args?: ArgsType;
}

export interface CustomDescriptionAndOptions {
  description?: string;
  httpExceptionOptions?: CustomHttpExceptionOptions;
}

export interface I18nHttpExceptionResponse {
  message: string | Record<string, any>;
  error: string;
  statusCode: number;
  args?: ArgsType;
}

export class I18nHttpException extends HttpException {
  constructor(
    response: string | Record<string, any>,
    status: number,
    options?: CustomHttpExceptionOptions,
  ) {
    super(
      {
        message: response,
        error: 'I18n Request',
        statusCode: status,
        args: options?.args || undefined,
      },
      status,
      options,
    );
  }

  request?: Request;

  static extractCustomDescriptionAndOptionsFrom(
    descriptionOrOptions: string | CustomHttpExceptionOptions,
  ): CustomDescriptionAndOptions {
    const extracted: CustomDescriptionAndOptions = {
      description: '',
      httpExceptionOptions: {},
    };

    if (typeof descriptionOrOptions === 'string') {
      extracted.description = descriptionOrOptions;
    } else if (
      typeof descriptionOrOptions === 'object' &&
      descriptionOrOptions !== null
    ) {
      extracted.description = descriptionOrOptions.description || '';
      extracted.httpExceptionOptions = descriptionOrOptions;
    }

    return extracted;
  }
}
