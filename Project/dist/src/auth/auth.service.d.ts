import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { CreateAuthDto } from './dto/create-auth.dto';
import { Connection } from 'typeorm';
export declare class AuthService {
    private userService;
    private jwtService;
    private connection;
    constructor(userService: UserService, jwtService: JwtService, connection: Connection);
    validateUser(username: string, pass: string): Promise<any>;
    login(loginDto: CreateAuthDto): Promise<{
        access_token: string;
        packageId: any;
        userType: any;
        username: any;
    }>;
}
