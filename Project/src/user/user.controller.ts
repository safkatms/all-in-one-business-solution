import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UseGuards, Request, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    return this.userService.registerUser(createUserDto);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async viewProfile(@Request() req) {
    const user = req.user; 
    return await this.userService.findProfileByUsername(user.username);
  }

  @Patch('profile/update')
  @UseGuards(JwtAuthGuard)
  async updateProfile(@Request() req, @Body(ValidationPipe) updateProfileDto: UpdateProfileDto) {
    await this.userService.updateProfile(req.user.userId, updateProfileDto);
    return {message:"Profile updated successfully"};
  }

  @Patch('change-password')
  @UseGuards(JwtAuthGuard)
  async changePassword(@Request() req, @Body(ValidationPipe) changePasswordDto: ChangePasswordDto) {
    if (changePasswordDto.newPassword !== changePasswordDto.confirmPassword) {
      throw new UnauthorizedException('New password and confirm password do not match');
    }

    await this.userService.changePassword(req.user.userId, changePasswordDto.currentPassword, changePasswordDto.newPassword);
    return { message: 'Password successfully changed' };
  }

}
