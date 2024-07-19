import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'user_settings' })
@ObjectType()
export class UserSetting {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  userId: number;

  @Field({ defaultValue: false })
  @Column()
  receiveNotifications: boolean;

  @Field({ defaultValue: false })
  @Column()
  receiveEmails: boolean;
}
