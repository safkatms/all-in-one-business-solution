import { Package } from 'src/package/entities/package.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column({ nullable: false })
  firstName: string;

  @Column({ nullable: false })
  lastName: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: false })
  mobileNo: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false })
  company: string;

  @Column({ nullable: false })
  gender: string;

  @Column({ nullable: true })
  profilePicture: string;

  @Column({ nullable: false })
  userType: string;

  @Column({ nullable: true })
  packageId: number;

  @Column({ nullable: true })
  passwordResetToken: string;

  @Column({ type: 'timestamp', nullable: true })
  passwordResetTokenExpires: Date;

  @ManyToOne(() => Package)
  @JoinColumn({ name: "packageId" })
  package: Package;
}
