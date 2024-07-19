import { PromiseResponse } from '@common/interfaces/responses/api-response.interface';

export abstract class BaseController<T> {
  abstract create(...args: any[]): PromiseResponse<T>;
  abstract update(...args: any[]): PromiseResponse<T>;
  abstract findOne(id: number | string, ...args: any[]): PromiseResponse<T>;
  abstract findAll(...args: any[]): PromiseResponse<T[]>;
  abstract delete(id: number | string, ...args: any[]): PromiseResponse<T>;
}
