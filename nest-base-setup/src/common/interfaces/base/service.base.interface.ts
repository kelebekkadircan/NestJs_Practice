export abstract class BaseService<T> {
  abstract create(data: unknown, ...args: any[]): Promise<T>;
  abstract update(id: number | string, data: Partial<unknown>, ...args: any[]): Promise<T>;
  abstract findOne(id: number | string, ...args: any[]): Promise<T>;
  abstract findAll(...args: any[]): Promise<T[]>;
  abstract delete(id: number | string, ...args: any[]): Promise<T>;
}
