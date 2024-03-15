// package.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Package {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  validFrom: Date;

  @Column()
  validTill: Date;
}
