import { CreateLeaveApplicationDto } from './dto/create-leave-application.dto';
import { UpdateLeaveApplicationDto } from './dto/update-leave-application.dto';
import { Leave } from './entities/leave-application.entity';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
export declare class LeaveApplicationService {
    private leaveRepository;
    private userRepository;
    constructor(leaveRepository: Repository<Leave>, userRepository: Repository<User>);
    createLeaveApplication(userId: number, createLeaveDto: CreateLeaveApplicationDto): Promise<Leave>;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateLeaveApplicationDto: UpdateLeaveApplicationDto): string;
    remove(id: number): string;
}
