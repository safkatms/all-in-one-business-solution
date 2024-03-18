import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(createUserDto: CreateUserDto): Promise<import("src/user/entities/user.entity").User>;
    viewProfile(req: any): Promise<import("src/user/entities/user.entity").User>;
    updateProfile(req: any, updateProfileDto: UpdateProfileDto): Promise<import("src/user/entities/user.entity").User>;
}
