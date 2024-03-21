import { Repository, Connection } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
export declare class UserService {
    private usersRepository;
    private connection;
    constructor(usersRepository: Repository<User>, connection: Connection);
    registerUser(createUserDto: CreateUserDto): Promise<any>;
    private createSchemaForUser;
    updateProfile(userId: number, updateProfileDto: UpdateProfileDto): Promise<User>;
    findByUsername(username: string): Promise<User | undefined>;
    findProfileByUsername(username: string): Promise<User | undefined>;
    changePassword(userId: number, currentPassword: string, newPassword: string): Promise<void>;
    createPasswordResetToken(email: string): Promise<void>;
    resetPassword(token: string, newPassword: string): Promise<void>;
}
