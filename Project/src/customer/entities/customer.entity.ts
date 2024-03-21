import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Column({ nullable: false })
  name: string;

  @Column()
  @Column({ nullable: false })
  contact: string;

  @Column()
  @Column({ nullable: false })
  email: string;
}
