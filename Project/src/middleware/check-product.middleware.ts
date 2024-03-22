// src/orders/middlewares/check-product.middleware.ts

import { Injectable, NestMiddleware, BadRequestException, NotFoundException } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InventoryManagement } from '../inventory-management/entities/inventory-management.entity';

@Injectable()
export class CheckProductMiddleware implements NestMiddleware {
  constructor(
    @InjectRepository(InventoryManagement)
    private readonly inventoryRepository: Repository<InventoryManagement>,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const items = req.body.items || [req.body];
    for (const item of items) {
      let product;
      if (item.productId) {
        product = await this.inventoryRepository.findOneBy({ productId: item.productId });
      } else if (item.productName) {
        product = await this.inventoryRepository.findOneBy({ productName: item.productName });
      } else {
        throw new BadRequestException('Product identifier not provided.');
      }

      if (!product) {
        throw new NotFoundException('Product not found.');
      }

      if (product.productQuantity < item.quantity) {
        throw new BadRequestException(`Not enough quantity for product ${product.productName || item.productId}.`);
      }
    }
    next();
  }
}
