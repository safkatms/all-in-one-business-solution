// package.controller.ts
import { Controller, Post, Body, Param, ParseIntPipe, ValidationPipe } from '@nestjs/common';
import { PackageService } from './package.service';
import { CreatePackageDto } from './dto/create-package.dto';

@Controller('packages')
export class PackageController {
  constructor(private readonly packageService: PackageService) {}

  @Post('/:userId')
  createPackage(
    @Param('userId', ParseIntPipe) userId: number,
    @Body(ValidationPipe) createPackageDto: CreatePackageDto,
  ) {
    return this.packageService.createPackage(userId, createPackageDto);
  }
}
