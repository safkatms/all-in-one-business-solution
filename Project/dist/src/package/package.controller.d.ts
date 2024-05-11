import { PackageService } from './package.service';
import { CreatePackageDto } from './dto/create-package.dto';
import { UpdatePackageDto } from './dto/update-package.dto';
export declare class PackageController {
    private readonly packageService;
    constructor(packageService: PackageService);
    createPackage(req: any, createPackageDto: CreatePackageDto): Promise<any>;
    getUserPackage(req: any): Promise<import("./entities/package.entity").Package>;
    updatePackage(updatePackageDto: UpdatePackageDto, req: any): Promise<any>;
}
