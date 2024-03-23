import { Customer } from 'src/customer/entities/customer.entity';
import { Employee } from 'src/employee/entities/employee.entity';
import { InventoryManagement } from 'src/inventory-management/entities/inventory-management.entity';
<<<<<<< HEAD
import { Invoice } from 'src/invoice/entities/invoice.entity';
=======
import { Leave } from 'src/leave-application/entities/leave-application.entity';
>>>>>>> 07937661728f501b160b17ce4d3ae226695fa5cd
import { OrderItem } from 'src/order/entities/order-item.entity';
import { Order } from 'src/order/entities/order.entity';
import { Package } from 'src/package/entities/package.entity';
import { Payroll } from 'src/payroll/entities/payroll.entity';
import { PurchaseManagement } from 'src/purchase-management/entities/purchase-management.entity';
import { User } from 'src/user/entities/user.entity';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export const config: PostgresConnectionOptions = {
  type: 'postgres',
  database: 'project',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '123',

  entities: [
    User,
    Package,
    Employee,
    Payroll,
    InventoryManagement,
    PurchaseManagement,
    Customer,
    Order,
    OrderItem,
<<<<<<< HEAD
    Invoice,
=======
    Leave
>>>>>>> 07937661728f501b160b17ce4d3ae226695fa5cd
  ],
  synchronize: true,
};
