import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UseGuards,
  Get,
  Put,
  NotFoundException,
} from '@nestjs/common';
import { PackageService } from './package.service';
import { CreatePackageDto } from './dto/create-package.dto';
import { Request } from '@nestjs/common';
import { RoleGuard } from 'src/guards/role.guard';
import { UpdatePackageDto } from './dto/update-package.dto';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@Controller('packages')
@UseGuards(JwtAuthGuard, new RoleGuard(['owner']))
@ApiTags('Packages')
@ApiBearerAuth('access-token')
export class PackageController {
  constructor(private readonly packageService: PackageService) {}

  @Post('/purchase')
  @ApiOperation({ summary: 'Purchase a new package' })
  @ApiResponse({ status: 201, description: 'Package successfully purchased.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiBody({ type: CreatePackageDto })
  createPackage(
    @Request() req,
    @Body(ValidationPipe) createPackageDto: CreatePackageDto,
  ) {
    const userId = req.user.userId;
    return this.packageService.createPackage(userId, createPackageDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get the user\'s current package' })
  @ApiResponse({ status: 200, description: 'Returns the user\'s current package.' })
  @ApiResponse({ status: 404, description: 'User does not have an associated package.' })
  async getUserPackage(@Request() req) {
    const userPackage = req.user.packageId;
    if (!userPackage) {
      throw new NotFoundException('User does not have an associated package');
    }
    return this.packageService.findById(userPackage);
  }

  @Put('/renew')
  @ApiOperation({ summary: 'Renew or update the user\'s package' })
  @ApiResponse({ status: 200, description: 'Package successfully updated.' })
  @ApiResponse({ status: 404, description: 'Package not found or user does not have an associated package.' })
  @ApiBody({ type: UpdatePackageDto })
  async updatePackage(
    @Body(ValidationPipe) updatePackageDto: UpdatePackageDto,
    @Request() req: any,
  ): Promise<any> {
    const packageId = req.user.packageId;
    return this.packageService.updatePackage(packageId, updatePackageDto);
  }
}
