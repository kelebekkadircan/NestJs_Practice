import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserProfileDto } from 'src/users/dtos/profile/CreateUserProfile.dto';
import { UpdateUserProfileDto } from 'src/users/dtos/profile/UpdateUserProfile.dto';
import { Profile } from 'src/users/entities/Profile';
import { User } from 'src/users/entities/User';
import { Repository } from 'typeorm';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Profile) private profileRepository: Repository<Profile>,
  ) {}

  async createUserProfile(
    id: number,
    createUserProfileDto: CreateUserProfileDto,
  ) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const newProfile = this.profileRepository.create(createUserProfileDto);
    const savedProfile = await this.profileRepository.save(newProfile);
    user.profile = savedProfile;
    return this.userRepository.save(user);
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
