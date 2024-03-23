import { Repository } from 'typeorm';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { Package } from '../package/entities/package.entity';
import { User } from '../user/entities/user.entity';
export declare class PaymentService {
    private readonly userRepository;
    private readonly packageRepository;
    constructor(userRepository: Repository<User>, packageRepository: Repository<Package>);
    makePayment(userId: number, createPaymentDto: CreatePaymentDto): Promise<string>;
}
