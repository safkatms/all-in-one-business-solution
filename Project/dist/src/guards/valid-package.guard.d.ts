import { CanActivate, ExecutionContext } from '@nestjs/common';
import { PackageService } from '../package/package.service';
export declare class ValidPackageGuard implements CanActivate {
    private packageService;
    constructor(packageService: PackageService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
