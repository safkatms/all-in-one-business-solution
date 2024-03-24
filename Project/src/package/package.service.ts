import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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

  async createPackage(
    userId: number,
    createPackageDto: CreatePackageDto,
  ): Promise<any> {
    const user = await this.userRepository.findOneBy({ userId: userId });

    if (user.packageId) {
      const existingPackage = await this.packageRepository.findOne({where:{id:user.packageId}});
      if (existingPackage && existingPackage.validTill >= new Date()) {
        throw new ConflictException('User already has an active package');
      }
    }

    const packageEntity = this.packageRepository.create({
      ...createPackageDto,
      validFrom: new Date(),
      validTill: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    });
    await this.packageRepository.save(packageEntity);

    user.packageId = packageEntity.id;
    await this.userRepository.save(user);

    return {
      message: 'Package purchased successfully',
      package: packageEntity,
    };
  }

  async findById(userPackage: number): Promise<Package> {
    const packageEntity = await this.packageRepository.findOne({where:{id: userPackage}});
    if (!packageEntity) {
      throw new NotFoundException(`Package with ID ${userPackage} not found`);
    }
    return packageEntity;
  }

  async updatePackage(
    packageId: number,
    updatePackageDto: UpdatePackageDto,
  ): Promise<any> {
    const packageEntity = await this.packageRepository.findOneBy({
      id: packageId,
    });
    if (!packageEntity) {
      throw new NotFoundException(`Package with ID ${packageId} not found`);
    }

    if (packageEntity.validTill >= new Date()) {
      return {
        message: 'You already have an active package',
        package: packageEntity,
      };
    }

    const validFrom = new Date();
    const validTill = new Date(validFrom.getTime() + 30 * 24 * 60 * 60 * 1000);

    packageEntity.validFrom = validFrom;
    packageEntity.validTill = validTill;

    return this.packageRepository.save(packageEntity);
  }
}
