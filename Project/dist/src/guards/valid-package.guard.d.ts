import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
export declare class ValidPackageGuard implements CanActivate {
    private rolesPassed;
    constructor(roles: string[]);
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>;
}
