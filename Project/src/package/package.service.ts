import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { Package } from './entities/package.entity';
import { CreatePackageDto } from './dto/create-package.dto';
import { UpdatePackageDto } from './dto/update-package.dto';

@Injectable()
export class PackageService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Package)
    private packageRepository: Repository<Package>,
  ) {}

  async createPackage(userId: number, createPackageDto: CreatePackageDto): Promise<any> {
    const user = await this.userRepository.findOneBy({ userId: userId });

    // Ensure the user does not already have an active package
    if (user.packageId) {
      const existingPackage = await this.findById(user.packageId);
      if (existingPackage && existingPackage.validTill >= new Date()) {
        throw new ConflictException('User already has an active package');
      }
    }

    // Create and save the new package
    const packageEntity = this.packageRepository.create({
      ...createPackageDto,
      validFrom: new Date(),
      validTill: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // Assuming a 30-day validity
    });
    await this.packageRepository.save(packageEntity);

    // Update the user's packageId reference
    user.packageId = packageEntity.id;
    await this.userRepository.save(user);

    return { message: 'Package purchased successfully', package: packageEntity };
  }

  async findById(userId: number): Promise<Package> {
    const packageEntity = await this.packageRepository.findOneBy({ id: userId });
    if (!packageEntity) {
      throw new NotFoundException(`Package with ID ${userId} not found`);
    }
    return packageEntity;
  }
  

  async updatePackage(packageId: number, updatePackageDto: UpdatePackageDto): Promise<any> {
    const packageEntity = await this.packageRepository.findOneBy({ id: packageId });
    if (!packageEntity) {
      throw new NotFoundException(`Package with ID ${packageId} not found`);
    }

    if (packageEntity.validTill >= new Date()) {
      //throw new ConflictException(`You already have an active package`)
      return {message:'You already have an active package',package:packageEntity};
    }

    // Calculate the validity period (30 days from now)
    const validFrom = new Date();
    const validTill = new Date(validFrom.getTime() + 30 * 24 * 60 * 60 * 1000);

    // Update the package with new validity dates
    packageEntity.validFrom = validFrom;
    packageEntity.validTill = validTill;


    // Save and return the updated package
    return this.packageRepository.save(packageEntity);
  }

}
