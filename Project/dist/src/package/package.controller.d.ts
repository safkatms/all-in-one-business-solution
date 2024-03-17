import { PackageService } from './package.service';
import { CreatePackageDto } from './dto/create-package.dto';
export declare class PackageController {
    private readonly packageService;
    constructor(packageService: PackageService);
    createPackage(req: any, createPackageDto: CreatePackageDto): Promise<any>;
}
