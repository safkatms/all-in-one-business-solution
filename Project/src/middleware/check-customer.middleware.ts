import { Injectable, NestMiddleware, BadRequestException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class CheckCustomerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('CheckCustomerMiddleware is running...');

    const { email, contact, name } = req.body;

    if (!email || !this.isValidEmail(email)) {
      throw new BadRequestException('Invalid or missing email.');
    }

    if (!contact || !this.isValidMobileNumber(contact)) {
      throw new BadRequestException('Mobile number must be a valid Bangladeshi number of 11 digits.');
    }

    if (!name || !this.isValidName(name)) {
      throw new BadRequestException('Name must start with a capital letter and contain only alphabets.');
    }

    next();
  }

  private isValidEmail(email: string): boolean {
    return email.includes('@') && email.includes('.');
  }

  private isValidMobileNumber(contact: string): boolean {
    return /^01[3-9]\d{8}$/.test(contact);
  }

  private isValidName(name: string): boolean {
    return /^[A-Z][a-z]*$/.test(name);
  }
}
