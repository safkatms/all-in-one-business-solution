import { Controller, Get, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { SetSchemaGuard } from 'src/guards/schema.guard';
import { RoleGuard } from 'src/guards/role.guard';
import { ApiBearerAuth, ApiTags, ApiOkResponse, ApiParam, ApiInternalServerErrorResponse } from '@nestjs/swagger';

@ApiBearerAuth('access-token') // Requires Bearer token for authentication
@ApiTags('Invoices') // Tags for grouping endpoints in Swagger UI
@Controller('invoices')
@UseGuards(JwtAuthGuard, SetSchemaGuard, new RoleGuard(['owner', 'salesman']))
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @Get('/order/:orderId')
  @ApiParam({ name: 'orderId', description: 'ID of the order', type: Number })
  @ApiOkResponse({ description: 'Successfully retrieved invoice for the order' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  getInvoiceForOrder(@Param('orderId', ParseIntPipe) orderId: number) {
    return this.invoiceService.generateInvoiceForOrder(orderId);
  }
}
