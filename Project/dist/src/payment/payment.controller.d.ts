import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
export declare class PaymentController {
    private readonly paymentService;
    constructor(paymentService: PaymentService);
    makePayment(req: any, createPaymentDto: CreatePaymentDto): Promise<string>;
}
