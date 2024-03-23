// src/payment/payment.module.ts

import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Package } from '../package/entities/package.entity';
import { User } from '../user/entities/user.entity';
import { UserModule } from '../user/user.module'; // Assuming this is the module where UserRepository is provided

@Module({
  imports: [
    TypeOrmModule.forFeature([Package, User]),
    UserModule, // Import UserModule here
  ],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
