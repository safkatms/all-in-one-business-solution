import { Package } from '../../package/entities/package.entity';
export declare class Payment {
    id: number;
    cardNumber: string;
    cardExpiry: string;
    cardCVC: string;
    amount: number;
    package: Package;
    packageId: number;
}
