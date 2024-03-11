import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class ExampleMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Example Middleware is working!');
    console.log(req.headers.authorization);
    const { authorization } = req.headers;

    if (!authorization) {
      throw new HttpException(
        'Authorization token is missing!',
        HttpStatus.FORBIDDEN,
      );
    }

    if (authorization === 'authorizaationvalue') {
      return next();
    } else {
      throw new HttpException(
        'Invalid authorization Token',
        HttpStatus.UNAUTHORIZED,
      );
    }
    next();
  }
}
