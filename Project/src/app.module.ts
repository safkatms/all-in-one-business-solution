import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'ormconfig';
import { PackageModule } from './package/package.module';
import { EmployeeModule } from './employee/employee.module';
import { InventoryManagementModule } from './inventory-management/inventory-management.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    TypeOrmModule.forRoot(config),
    PackageModule,
    EmployeeModule,
    InventoryManagementModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
