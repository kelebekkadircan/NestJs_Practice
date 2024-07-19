import { ResponseFail } from '@common/interfaces/responses/api-response.interface';

export type CusttomHttpExceptionResponse = ResponseFail & {
  path: string;
  method: string;
  timeStamp: Date;
  errorStack?: string;
};
