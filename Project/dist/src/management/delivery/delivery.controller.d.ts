import { DeliveryService } from './delivery.service';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';
export declare class DeliveryController {
    private readonly deliveryService;
    constructor(deliveryService: DeliveryService);
    makeDelivery(id: string, updateDeliveryDto: UpdateDeliveryDto): Promise<string>;
    findAll(): string;
    findOne(id: string): Promise<void>;
    returnDelivery(id: string, updateDeliveryDto: UpdateDeliveryDto): Promise<string>;
}
