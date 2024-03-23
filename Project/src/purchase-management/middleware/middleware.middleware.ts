import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { CreatePurchaseManagementDto } from '../dto/create-purchase-management.dto';

@Injectable()
export class PurchaseValidationMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const createPurchaseManagementDto = plainToClass(
      CreatePurchaseManagementDto,
      req.body,
    );
    const errors = await validate(createPurchaseManagementDto);
    console.log('middleware for purchase');
    if (errors.length > 0) {
      return res.status(400).json({
        message: 'Validation failed. please follow the validation criteria',
        errors,
      });
    }
    next();
  }
}
