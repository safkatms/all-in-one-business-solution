import { InvoiceItemDto } from './invoice-items.dto';
export declare class CreateInvoiceDto {
    readonly orderId: number;
    readonly customerName: string;
    readonly customerContact: string;
    readonly items: InvoiceItemDto[];
    readonly total: number;
}
