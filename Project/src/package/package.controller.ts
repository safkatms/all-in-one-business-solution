// package.controller.ts
import { Controller, Post, Body, Param, ParseIntPipe, ValidationPipe, UseGuards, Get, Put } from '@nestjs/common';
import { PackageService } from './package.service';
import { CreatePackageDto } from './dto/create-package.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from '@nestjs/common';
import { ValidPackageGuard } from 'src/guards/valid-package.guard';
import { UpdatePackageDto } from './dto/update-package.dto';

@Controller('packages')
export class PackageController {
  constructor(private readonly packageService: PackageService) { }

  @Post('/purchase')
  @UseGuards(AuthGuard('jwt'),ValidPackageGuard)
  createPackage(
    @Request() req,
    @Body(ValidationPipe) createPackageDto: CreatePackageDto,
  ) {
    const userId = req.user.userId;
    return this.packageService.createPackage(userId, createPackageDto);
  }
  
  @Get()
  @UseGuards(AuthGuard('jwt'),ValidPackageGuard)
  async getUserPackage(@Request() req) {
    const userId = req.user.packageId; // Assuming your JWT payload includes userId
    return this.packageService.findById(userId);
  }

  @Put('/renew')
  @UseGuards(AuthGuard('jwt'),ValidPackageGuard)
  async updatePackage(
    @Body(ValidationPipe) updatePackageDto: UpdatePackageDto,
    @Request() req: any, // Import Request from @nestjs/common
  ): Promise<any> {
    const packageId = req.user.packageId; // Assuming your JWT payload includes packageId
    return this.packageService.updatePackage(packageId, updatePackageDto);
  }
}
