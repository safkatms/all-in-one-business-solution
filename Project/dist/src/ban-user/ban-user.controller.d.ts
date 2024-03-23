import { BanUserService } from './ban-user.service';
export declare class BanUserController {
    private readonly banUserService;
    constructor(banUserService: BanUserService);
    getAllUsers(): Promise<import("src/user/entities/user.entity").User[]>;
    banUser(userId: number): Promise<string>;
    unbanUser(userId: number): Promise<string>;
}
