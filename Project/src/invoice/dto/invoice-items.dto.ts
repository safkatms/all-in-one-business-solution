import { ApiProperty } from '@nestjs/swagger';
export class InvoiceItemDto {
    @ApiProperty({ description: 'ID of the product' })
    readonly productId: number;

    @ApiProperty({ description: 'Name of the product' })
    readonly productName: string;

    @ApiProperty({ description: 'Quantity of the product' })
    readonly quantity: number;

    @ApiProperty({ description: 'Price of one unit of the product' })
    readonly price: number;

    @ApiProperty({ description: 'Total amount for this item' })
    readonly total: number;
}
