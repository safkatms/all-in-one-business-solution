import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { User } from 'src/user/entities/user.entity'; // Assuming this is correctly defined elsewhere

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
