import { Injectable } from '@nestjs/common';
import { CreateUserType } from 'src/utils/types/types';

@Injectable()
export class UsersService {
  private fakeUsers = [
    { username: 'Kadircan Service', email: 'kelebekkadircan@gmail.com' },
    { username: 'Baran Service', email: 'ogelmibaran@gmail.com' },
    { username: 'Ali Service', email: 'micoali@gmail.com' },
  ];
  fetchUsers() {
    return this.fakeUsers;
  }

  createUser(userDetails: CreateUserType) {
    this.fakeUsers.push(userDetails);
    return userDetails;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  fetchUserById(id: number) {
    return this.fakeUsers[id];
    // return null;
  }
}
