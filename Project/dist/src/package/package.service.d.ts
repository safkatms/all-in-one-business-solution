import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { Package } from './entities/package.entity';
import { CreatePackageDto } from './dto/create-package.dto';
import { UpdatePackageDto } from './dto/update-package.dto';
export declare class PackageService {
    private userRepository;
    private packageRepository;
    constructor(userRepository: Repository<User>, packageRepository: Repository<Package>);
    createPackage(userId: number, createPackageDto: CreatePackageDto): Promise<any>;
    findById(packageId: number): Promise<Package>;
    updatePackage(packageId: number, updatePackageDto: UpdatePackageDto): Promise<Package>;
}
