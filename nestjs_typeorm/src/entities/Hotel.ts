import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'hotels' })
export class Hotel {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ unique: true })
  title: string;

  @Column({ nullable: true })
  images: string;

  @Column()
  name: string;

  @Column({ type: 'bigint' })
  gsmNo: number;

  @Column()
  email: string;

  @Column({ nullable: true })
  address: string;

  // @Column()
  // createdAt: Date;

  @Column()
  description: string;

  @Column({ nullable: true })
  authStrategy: string;
}
