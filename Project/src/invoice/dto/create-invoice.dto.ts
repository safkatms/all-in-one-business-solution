// src/invoices/dto/create-invoice.dto.ts

export class CreateInvoiceDto {
    readonly orderId: number;
    readonly customerName: string;
    readonly customerContact: string;
    readonly items: InvoiceItemDto[];
    readonly total: number;
}

export class InvoiceItemDto {
    readonly productId: number;
    readonly productName: string;
    readonly quantity: number;
    readonly price: number; // Price per item
    readonly total: number; // Total price for this item (quantity * price)
}
