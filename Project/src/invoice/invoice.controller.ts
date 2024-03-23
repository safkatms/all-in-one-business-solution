import { Controller, Get, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { SetSchemaGuard } from 'src/guards/schema.guard';
import { RoleGuard } from 'src/guards/role.guard';

@Controller('invoices')
@UseGuards(JwtAuthGuard,SetSchemaGuard, new RoleGuard(['owner','salesman']))
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @Get('/order/:orderId')
  getInvoiceForOrder(@Param('orderId', ParseIntPipe) orderId: number) {
    return this.invoiceService.generateInvoiceForOrder(orderId);
  }

}
