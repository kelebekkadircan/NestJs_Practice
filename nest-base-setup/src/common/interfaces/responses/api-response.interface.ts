// eslint-disable-next-line @typescript-eslint/ban-types
export type Prettify<T> = { [K in keyof T]: T[K] } & {};

export type ResponseSuccess = { success: true };

export type ErrorContent = { message: unknown; statusCode: number };

export type ResponseFail = { success: false; error: ErrorContent };

export type RequestResponseSuccess<Response> = ResponseSuccess & {
  data: Response;
};

export type GeneralResponse<T> = {
  success: boolean;
} & (RequestResponseSuccess<T> | ResponseFail);

export type OnlySuccess<T> = Omit<GeneralResponse<T>, ''>;

export type PromiseOnlySuccess<T> = Promise<OnlySuccess<T>>;

export type PrettifyResponse<T> = Prettify<GeneralResponse<T>>;

export type Response<T> = PrettifyResponse<T>;

export type PromiseResponse<T> = Promise<PrettifyResponse<T>>;
