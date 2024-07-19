import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, length: 100 })
  username: string;

  @Column({ nullable: false, length: 100 })
  email: string;

  @Column({ nullable: true, length: 100 })
  displayName?: string;

  @Column({ nullable: true, length: 100 })
  password?: string;

  //   @CreateDateColumn({ name: 'created_at' })
  //   createdAt: Date;

  //   @UpdateDateColumn({ name: 'updated_at' })
  //   updatedAt: Date;
}
