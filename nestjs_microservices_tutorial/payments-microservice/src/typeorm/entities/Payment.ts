import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'payments' })
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column('float')
  amount: number;

  //   @CreateDateColumn()
  //   createdAt: Date;

  //   @UpdateDateColumn()
  //   updatedAt: Date;
}
