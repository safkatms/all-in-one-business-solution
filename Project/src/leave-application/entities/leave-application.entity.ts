import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';


@Entity('leave')
export class Leave {
  @PrimaryGeneratedColumn()
  leaveId: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column()
  description:string;

  @Column({ default: 'Pending' })
  status: string;
}
