// payroll.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Employee } from 'src/employee/entities/employee.entity';

@Entity("payroll")
export class Payroll {
  @PrimaryGeneratedColumn()
  payrollId: number;

  @ManyToOne(() => Employee)
  @JoinColumn({ name: "employeeId" }) 
  employee: Employee;


  @Column('numeric')
  salary: number;

  @Column('numeric', { default: 0 })
  bonus: number;

  @Column()
  payrollMonth: string;

  @Column()
  status: string;
}
