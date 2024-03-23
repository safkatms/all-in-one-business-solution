import { Injectable, NestMiddleware, BadRequestException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LeaveMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('LeaveMiddleware is running...');

    const { startDate, endDate } = req.body;

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      throw new BadRequestException('Invalid dates provided.');
    }

    if (start >= end) {
      throw new BadRequestException('The start date cannot be after the end date.');
    }

    const differenceInTime = end.getTime() - start.getTime();
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);

    if (differenceInDays > 7) {
      throw new BadRequestException('Leave application cannot span more than 7 days.');
    }

    next();
  }
}
