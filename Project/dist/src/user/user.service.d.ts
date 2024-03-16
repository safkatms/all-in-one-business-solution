import { Repository, Connection } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UserService {
    private usersRepository;
    private connection;
    constructor(usersRepository: Repository<User>, connection: Connection);
    registerUser(createUserDto: CreateUserDto): Promise<User>;
    private createSchemaForUser;
    findByUsername(username: string): Promise<User | undefined>;
}
