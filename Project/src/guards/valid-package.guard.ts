// guards/valid-package.guard.ts
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { PackageService } from '../package/package.service';

@Injectable()
export class ValidPackageGuard implements CanActivate {
  constructor(private packageService: PackageService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user; // Extracted from JWT token

    if (!user || !user.packageId) {
      throw new UnauthorizedException('No package associated with user account');
    }

    const userPackage = await this.packageService.findById(user.packageId);
    if (!userPackage) {
      throw new UnauthorizedException('No package found for this user');
    }
    
    const currentDate = new Date();
    if (currentDate > userPackage.validTill) {
      throw new UnauthorizedException('User package has expired');
    }

    return true;
  }
}
