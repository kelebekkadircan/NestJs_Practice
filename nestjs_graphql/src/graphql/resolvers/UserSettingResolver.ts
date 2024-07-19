import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UserSetting } from '../models/UserSetting';
import { CreateUserSettingInput } from '../utils/CreateUserSetingInput';
import { mockUserSettings } from 'src/__mocks__/mockUserSettings';

@Resolver(() => UserSetting)
export class UserSettingResolver {
  @Mutation(() => UserSetting)
  createUserSettings(
    @Args('createUserSettingData')
    createUserSettingData: CreateUserSettingInput,
  ): UserSetting {
    const { userId, receiveNotifications, receiveEmails } =
      createUserSettingData;

    mockUserSettings.push({
      userId,
      receiveNotifications,
      receiveEmails,
    });

    return createUserSettingData;
  }
}
