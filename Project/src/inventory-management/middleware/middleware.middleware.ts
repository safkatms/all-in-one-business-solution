import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { CreateInventoryManagementDto } from '../dto/create-inventory-management.dto';

@Injectable()
export class InventoryValidationMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const createInventoryManagementDto = plainToClass(
      CreateInventoryManagementDto,
      req.body,
    );
    const errors = await validate(createInventoryManagementDto);
    console.log('middleware for Inventory');
    if (errors.length > 0) {
      return res.status(400).json({
        message: 'Validation failed. please follow the validation criteria',
        errors,
      });
    }
    next();
  }
}
