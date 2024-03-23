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
import { PurchaseManagementModule } from './purchase-management/purchase-management.module';
import { SearchModule } from './search/search.module';
import { PayrollModule } from './payroll/payroll.module';
import { CustomerModule } from './customer/customer.module';
import { OrderModule } from './order/order.module';
import { DeliveryModule } from './management/delivery/delivery.module';
<<<<<<< HEAD
import { InvoiceModule } from './invoice/invoice.module';
=======
import { LeaveApplicationModule } from './leave-application/leave-application.module';
>>>>>>> 07937661728f501b160b17ce4d3ae226695fa5cd

@Module({
  imports: [
    UserModule,
    AuthModule,
    TypeOrmModule.forRoot(config),
    PackageModule,
    EmployeeModule,
    InventoryManagementModule,
    PurchaseManagementModule,
    SearchModule,
    PayrollModule,
    CustomerModule,
    OrderModule,
    DeliveryModule,
<<<<<<< HEAD
    InvoiceModule,
=======
    LeaveApplicationModule,
>>>>>>> 07937661728f501b160b17ce4d3ae226695fa5cd
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
