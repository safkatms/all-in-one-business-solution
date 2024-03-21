// employee.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Payroll } from 'src/payroll/entities/payroll.entity';

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  employeeid: number;

  @Column()
  userid: number;

  @OneToOne(() => User)
  @JoinColumn({ name: 'userid' })
  user: User;

  @Column('numeric')
  employeesalary: number;

  @Column()
  employeejoiningdate: Date;

}
