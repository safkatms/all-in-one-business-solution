import { LeaveApplicationService } from './leave-application.service';
import { CreateLeaveApplicationDto } from './dto/create-leave-application.dto';
import { UpdateLeaveApplicationDto } from './dto/update-leave-application.dto';
export declare class LeaveApplicationController {
    private readonly leaveApplicationService;
    constructor(leaveApplicationService: LeaveApplicationService);
    create(req: any, createLeaveDto: CreateLeaveApplicationDto): Promise<any>;
    findAll(): Promise<import("src/leave-application/entities/leave-application.entity").Leave[]>;
    findOne(id: string): string;
    update(id: string, updateLeaveApplicationDto: UpdateLeaveApplicationDto): string;
    remove(id: string): string;
}
