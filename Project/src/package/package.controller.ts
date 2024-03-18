// package.controller.ts
import { Controller, Post, Body, Param, ParseIntPipe, ValidationPipe, UseGuards, Get, Put, NotFoundException } from '@nestjs/common';
import { PackageService } from './package.service';
import { CreatePackageDto } from './dto/create-package.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from '@nestjs/common';
import { ValidPackageGuard } from 'src/guards/valid-package.guard';
import { UpdatePackageDto } from './dto/update-package.dto';
import { JwtAuthGuard } from 'src/guards/jwt.guard';

@Controller('packages')
@UseGuards(JwtAuthGuard,new ValidPackageGuard(['owner']))
export class PackageController {
  constructor(private readonly packageService: PackageService) { }

  @Post('/purchase')
  createPackage(
    @Request() req,
    @Body(ValidationPipe) createPackageDto: CreatePackageDto,
  ) {
    const userId = req.user.userId;
    return this.packageService.createPackage(userId, createPackageDto);
  }
  
  @Get()
async getUserPackage(@Request() req) {
  const packageId = req.user.packageId;
  if (!packageId) {
    throw new NotFoundException('User does not have an associated package');
  }
  return this.packageService.findById(packageId);
}

  @Put('/renew')
  async updatePackage(
    @Body(ValidationPipe) updatePackageDto: UpdatePackageDto,
    @Request() req: any, 
  ): Promise<any> {
    const packageId = req.user.packageId;
    return this.packageService.updatePackage(packageId, updatePackageDto);
  }
}
