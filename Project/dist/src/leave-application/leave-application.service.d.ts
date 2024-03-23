import { CreateLeaveApplicationDto } from './dto/create-leave-application.dto';
import { UpdateLeaveApplicationDto } from './dto/update-leave-application.dto';
import { Leave } from './entities/leave-application.entity';
import { User } from 'src/user/entities/user.entity';
import { Connection, Repository } from 'typeorm';
export declare class LeaveApplicationService {
    private leaveRepository;
    private userRepository;
    private connection;
    constructor(leaveRepository: Repository<Leave>, userRepository: Repository<User>, connection: Connection);
    createLeaveApplication(userId: number, createLeaveDto: CreateLeaveApplicationDto): Promise<any>;
    findAllPendingApplication(): Promise<Leave[]>;
    findAllUpdatedApplication(): Promise<Leave[]>;
    findAllByUserId(userId: number): Promise<Leave[]>;
    updateStatus(id: number, updateLeaveApplicationDto: UpdateLeaveApplicationDto): Promise<Leave>;
}
