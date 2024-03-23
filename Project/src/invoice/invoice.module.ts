// src/invoices/invoices.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvoiceService } from './invoice.service';
import { InvoiceController } from './invoice.controller';
import { Invoice } from './entities/invoice.entity';
import { OrderModule } from '../order/order.module'; // Import OrderModule
import { Order } from 'src/order/entities/order.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Invoice,Order]),
    OrderModule, // Import OrderModule here
  ],
  controllers: [InvoiceController],
  providers: [InvoiceService],
})
export class InvoiceModule {}
