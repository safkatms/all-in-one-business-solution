// payroll.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Employee } from 'src/employee/entities/employee.entity';

@Entity()
export class Payroll {
  @PrimaryGeneratedColumn()
  payrollId: number;

  @ManyToOne(() => Employee)
  @JoinColumn({ name: "employeeId" }) // This must match the exact column name in your database
  employee: Employee;


  @Column('numeric')
  salary: number;

  @Column('numeric', { default: 0 })
  bonus: number; // Added bonus field with a default value

  @Column()
  payrollMonth: string;

  @Column()
  status: string;
}
