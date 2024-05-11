import { LeaveApplicationService } from './leave-application.service';
import { CreateLeaveApplicationDto } from './dto/create-leave-application.dto';
import { UpdateLeaveApplicationDto } from './dto/update-leave-application.dto';
export declare class LeaveApplicationController {
    private readonly leaveApplicationService;
    constructor(leaveApplicationService: LeaveApplicationService);
    create(req: any, createLeaveDto: CreateLeaveApplicationDto): Promise<any>;
    findAllPendingApplication(): Promise<import("./entities/leave-application.entity").Leave[]>;
    findAll(): Promise<import("./entities/leave-application.entity").Leave[]>;
    findAllByUserId(req: any, userId: number): Promise<import("./entities/leave-application.entity").Leave[]>;
    update(id: number, updateLeaveApplicationDto: UpdateLeaveApplicationDto): Promise<import("./entities/leave-application.entity").Leave>;
}
