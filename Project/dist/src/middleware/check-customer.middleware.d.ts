import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
export declare class CheckCustomerMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction): void;
    private isValidEmail;
    private isValidMobileNumber;
    private isValidName;
}
