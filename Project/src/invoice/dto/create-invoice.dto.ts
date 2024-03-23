import { ApiProperty } from '@nestjs/swagger';
import { InvoiceItemDto } from './invoice-items.dto';

export class CreateInvoiceDto {
    @ApiProperty({ description: 'The ID of the order' })
    readonly orderId: number;

    @ApiProperty({ description: 'Name of the customer' })
    readonly customerName: string;

    @ApiProperty({ description: 'Contact information of the customer' })
    readonly customerContact: string;

    @ApiProperty({ type: [InvoiceItemDto], description: 'Items included in the invoice' })
    readonly items: InvoiceItemDto[];

    @ApiProperty({ description: 'Total amount of the invoice' })
    readonly total: number;
}

