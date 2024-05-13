import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt'; 
import { CreateAuthDto } from './dto/create-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService, 
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findByUsername(username);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!user.password || !(await bcrypt.compare(pass, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (user.status) {
      throw new UnauthorizedException('Account is banned');
    }

    const { password, status, ...result } = user;
    return result;
  }

  async login(loginDto: CreateAuthDto) {
    const user = await this.validateUser(loginDto.username, loginDto.password);

    const payload = { username: user.username, sub: user.userId, ...user };

    return {
      access_token: this.jwtService.sign(payload),
      packageId: user.packageId
    };
  }

  
}
