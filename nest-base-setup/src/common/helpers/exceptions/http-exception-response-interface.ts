export interface HttpExceptionResponse {
  statusCode: number;
  error: string | unknown;
}

export interface CusttomHttpExceptionResponse extends HttpExceptionResponse {
  path: string;
  method: string;
  timeStamp: Date;
  errorStack?: string;
}
