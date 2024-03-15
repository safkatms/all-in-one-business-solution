// package.service.ts
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { Package } from './entities/package.entity';
import { CreatePackageDto } from './dto/create-package.dto';

@Injectable()
export class PackageService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Package)
    private packageRepository: Repository<Package>,
  ) { }

  async createPackage(userId: number, createPackageDto: CreatePackageDto): Promise<any> {
    const user = await this.userRepository.findOneBy({ userId: userId });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    // Check if the user already has a package 
    const currentDate = new Date();
    if (user.packageId) {
      throw new ConflictException('User has already purchased a package');
    }

    // Create new package if not exist
    const packageEntity = this.packageRepository.create({
      ...createPackageDto,
      validFrom: new Date(), // Set validFrom as the current date
      validTill: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // Set validTill as 30 days from now
    });
    await this.packageRepository.save(packageEntity);


    // Update user's packageId with the new package's id
    user.packageId = packageEntity.id;
    await this.userRepository.save(user);

    return { message: 'Package purchased successfully', package: packageEntity };
  }
}
