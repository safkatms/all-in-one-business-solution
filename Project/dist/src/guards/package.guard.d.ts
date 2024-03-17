import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PackageService } from '../package/package.service';
export declare class ValidPackageGuard implements CanActivate {
    private reflector;
    private packageService;
    constructor(reflector: Reflector, packageService: PackageService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
