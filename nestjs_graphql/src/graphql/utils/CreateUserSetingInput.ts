import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateUserSettingInput {
  @Field(() => Int)
  userId: number;

  @Field({ nullable: true })
  receiveNotifications: boolean;

  @Field({ nullable: true })
  receiveEmails: boolean;
}
