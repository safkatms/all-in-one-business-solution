import { NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { Repository } from 'typeorm';
import { InventoryManagement } from '../inventory-management/entities/inventory-management.entity';
export declare class CheckProductMiddleware implements NestMiddleware {
    private readonly inventoryRepository;
    constructor(inventoryRepository: Repository<InventoryManagement>);
    use(req: Request, res: Response, next: NextFunction): Promise<void>;
}
