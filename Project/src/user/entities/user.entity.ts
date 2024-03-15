import { Package } from 'src/package/entities/package.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  mobileNo: string;

  @Column()
  password: string;

  @Column()
  company: string;

  @Column()
  gender: string;

  @Column({ nullable: true })
  profilePicture: string;

  @Column()
  userType: string;

  @Column({ nullable: true })
  packageId: number;

  @ManyToOne(() => Package)
  @JoinColumn({ name: "packageId" })
  package: Package;
}
