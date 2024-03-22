import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from 'src/users/entities/User';
import { Repository } from 'typeorm';
import { UpdateUserDto } from 'src/users/dtos/users/UpdateUser.dto';
import { CreateUserDto } from 'src/users/dtos/users/CreateUser.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  findUsers() {
    return this.userRepository.find({
      relations: ['profile', 'posts', 'posts.labels'],
    });
  }

  async findUsersById(id: number) {
    return await this.userRepository.findOneBy({ id });
  }

  createUser(userDetails: CreateUserDto) {
    const newUser = this.userRepository.create({
      ...userDetails,
      createdAt: new Date(),
    });
    return this.userRepository.save(newUser);
  }

  updateUser(id: number, updateUserDetails: UpdateUserDto) {
    return this.userRepository.update({ id }, { ...updateUserDetails });
  }
  deleteUser(id: number) {
    return this.userRepository.delete({ id });
  }
}
