// package.controller.ts
import { Controller, Post, Body, Param, ParseIntPipe, ValidationPipe, UseGuards } from '@nestjs/common';
import { PackageService } from './package.service';
import { CreatePackageDto } from './dto/create-package.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from '@nestjs/common';

@Controller('packages')
export class PackageController {
  constructor(private readonly packageService: PackageService) { }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  createPackage(
    @Request() req,
    @Body(ValidationPipe) createPackageDto: CreatePackageDto,
  ) {
    const userId = req.user.userId;
    return this.packageService.createPackage(userId, createPackageDto);
  }
}
