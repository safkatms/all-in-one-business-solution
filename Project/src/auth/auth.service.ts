// auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt'; // Import JwtService
import { CreateAuthDto } from './dto/create-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService // Inject JwtService
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findByUsername(username);
    
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!user.password || !(await bcrypt.compare(pass, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Omit the password from the user object before returning
    const { password, ...result } = user;
    return result;
  }

  // Method for logging in users and generating a JWT token
  async login(loginDto: CreateAuthDto) {
    // Validate the user with provided credentials
    const user = await this.validateUser(loginDto.username, loginDto.password);

    // Payload to include in the JWT token
    const payload = { username: user.username, sub: user.userId, ...user }; // Adjust payload as needed

    return {
      access_token: this.jwtService.sign(payload), // Sign and return the JWT token
    };
  }
}
