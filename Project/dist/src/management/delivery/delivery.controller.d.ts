import { DeliveryService } from './delivery.service';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';
export declare class DeliveryController {
    private readonly deliveryService;
    constructor(deliveryService: DeliveryService);
    makeDelivery(id: string, updateDeliveryDto: UpdateDeliveryDto): Promise<string>;
    findOne(id: string): Promise<import("src/order/entities/order.entity").Order>;
    returnDelivery(id: string, updateDeliveryDto: UpdateDeliveryDto): Promise<string>;
}
