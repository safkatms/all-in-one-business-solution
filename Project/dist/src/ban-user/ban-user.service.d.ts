import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
export declare class BanUserService {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    updateBanStatus(userId: number, status: boolean): Promise<string>;
    getAllUsers(): Promise<User[]>;
}
