import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserProfileDto } from 'src/users/dtos/profile/CreateUserProfile.dto';
import { UpdateUserProfileDto } from 'src/users/dtos/profile/UpdateUserProfile.dto';
import { Profile } from 'src/users/entities/Profile';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';

@Injectable()
export class ProfileService {
  constructor(
    private readonly userService: UsersService,
    @InjectRepository(Profile) private profileRepository: Repository<Profile>,
  ) {}

  async createUserProfile(
    id: number,
    createUserProfileDto: CreateUserProfileDto,
  ) {
    const user = await this.userService.findUsersById(id);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const newProfile = this.profileRepository.create({
      ...createUserProfileDto,
      user,
    });
    return await this.profileRepository.save(newProfile);
  }

  async getProfiles() {
    return await this.profileRepository.find({ relations: ['user'] });
  }

  async updateUserProfile(
    id: number,
    updateUserProfileDto: UpdateUserProfileDto,
  ) {
    return await this.profileRepository.update(
      { id },
      { ...updateUserProfileDto },
    );
  }
}
