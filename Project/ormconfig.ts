import { Employee } from 'src/employee/entities/employee.entity';
import { Package } from 'src/package/entities/package.entity';
import { User } from 'src/user/entities/user.entity';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export const config: PostgresConnectionOptions = {
  type: 'postgres',
  database: 'project',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '123',
  entities: [User,Package,Employee],
  synchronize: true,
};
