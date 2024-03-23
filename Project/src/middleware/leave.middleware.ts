
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LeaveMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // This middleware could extract user-related context for the leave operation,
    // for example, ensuring that the leave dates are within acceptable bounds.

    // This is a placeholder for whatever leave-specific logic you need.
    console.log('LeaveMiddleware is running...');

    next();
  }
}
