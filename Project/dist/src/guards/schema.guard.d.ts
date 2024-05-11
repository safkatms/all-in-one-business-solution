import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Connection } from 'typeorm';
export declare class SetSchemaGuard implements CanActivate {
    private connection;
    constructor(connection: Connection);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
