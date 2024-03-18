import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { Connection } from 'typeorm';
export declare class SetSchemaMiddleware implements NestMiddleware {
    private connection;
    constructor(connection: Connection);
    use(req: Request, res: Response, next: NextFunction): Promise<void>;
}
