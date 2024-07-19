/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Args,
  Int,
  Parent,
  Query,
  ResolveField,
  Resolver,
  Mutation,
} from '@nestjs/graphql';
import { User } from '../graphql/models/User';
import { mockUser } from 'src/__mocks__/mockUser';
import { UserSetting } from '../graphql/models/UserSetting';
import { mockUserSettings } from 'src/__mocks__/mockUserSettings';
import { create } from 'domain';
import { CreateUserInput } from '../graphql/utils/CreateUserInput';
import { UserService } from './users.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => User, { nullable: true })
  async getUserById(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<User> {
    return await this.userService.getUserById(id);
  }

  @Query(() => [User])
  async getUsers(): Promise<User[]> {
    return await this.userService.getAllUsers();
  }

  @ResolveField(() => UserSetting, { name: 'settings', nullable: true })
  getUserSettings(@Parent() user: User): UserSetting {
    console.log(user);

    return mockUserSettings.find((setting) => setting.userId === user.id);
  }

  @Mutation(() => User)
  async createUser(
    @Args('createUserData') createUserData: CreateUserInput,
  ): Promise<User> {
    return await this.userService.createUser(createUserData);
  }
}
