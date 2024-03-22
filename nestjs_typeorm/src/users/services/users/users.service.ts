import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Label } from 'src/users/entities/Label';

import { User } from 'src/users/entities/User';
import { Repository } from 'typeorm';
import { UpdateUserDto } from 'src/users/dtos/users/UpdateUser.dto';
import { CreateUserDto } from 'src/users/dtos/users/CreateUser.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,

    @InjectRepository(Label) private labelRepository: Repository<Label>,
  ) {}

  findUsers() {
    return this.userRepository.find({
      relations: ['profile', 'posts', 'posts.labels'],
    });
  }

  async findlabels() {
    return await this.labelRepository.find();
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
