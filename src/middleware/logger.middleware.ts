import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Response, Request } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const dateTime = new Date().toLocaleString('es', {
      timeZone: 'America/Argentina/Buenos_Aires',
    });
    console.log(`${req.method} to ${req.url} at ${dateTime}`);
    next();
  }
}
