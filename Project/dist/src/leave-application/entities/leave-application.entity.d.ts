import { User } from '../../user/entities/user.entity';
export declare class Leave {
    leaveId: number;
    user: User;
    startDate: Date;
    endDate: Date;
    description: string;
    status: string;
}
