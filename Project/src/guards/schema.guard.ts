import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Connection } from 'typeorm';

@Injectable()
export class SetSchemaGuard implements CanActivate {
  constructor(private connection: Connection) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    console.log('User:', req.user); // Debugging: Log user object

    const user = req.user as any;

    if (user && user.company) {
      const schemaName = `${user.company}`;
      console.log('Setting search path to:', schemaName); // Debugging: Log schema name
      await this.connection.query(`SET search_path TO "${schemaName}"`);
    }

    return true;
  }
}
