import { Controller, Get, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { SetSchemaGuard } from 'src/guards/schema.guard';
import { RoleGuard } from 'src/guards/role.guard';
import { ApiBearerAuth, ApiTags, ApiOkResponse, ApiParam, ApiInternalServerErrorResponse, ApiOperation } from '@nestjs/swagger';

@ApiBearerAuth('access-token') 
@ApiTags('Invoices') 
@Controller('invoices')
@UseGuards(JwtAuthGuard, SetSchemaGuard, new RoleGuard(['owner', 'salesman']))
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @ApiOperation({ summary: 'Get invoice for a specific order' })
  @Get('/order/:orderId')
  @ApiParam({ name: 'orderId', description: 'ID of the order', type: Number })
  @ApiOkResponse({ description: 'Successfully retrieved invoice for the order' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  getInvoiceForOrder(@Param('orderId', ParseIntPipe) orderId: number) {
    return this.invoiceService.generateInvoiceForOrder(orderId);
  }
}
