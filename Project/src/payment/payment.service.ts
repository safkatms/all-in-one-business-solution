// src/payment/payment.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { Package } from '../package/entities/package.entity';
import { User } from '../user/entities/user.entity';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Package)
    private readonly packageRepository: Repository<Package>,
  ) {}

  async makePayment(userId: number, createPaymentDto: CreatePaymentDto): Promise<string> {
    const user = await this.userRepository.findOne({ where: { userId }, relations: ['package'] });
    if (!user || !user.package || user.package.status !== 'unpaid') {
      throw new NotFoundException(`No unpaid package found for user ID ${userId}.`);
    }

    // Assume payment is processed successfully

    user.package.status = 'paid';
    await this.packageRepository.save(user.package);

    return `Payment for user ID ${userId} processed successfully. Package ID ${user.package.id} is now active.`;
  }
}
