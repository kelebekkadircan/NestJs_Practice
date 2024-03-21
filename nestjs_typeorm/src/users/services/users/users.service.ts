import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Label } from 'src/entities/Label';
import { Post } from 'src/entities/Posts';
import { Profile } from 'src/entities/Profile';
import { User } from 'src/entities/User';
import { CreatePostLabelDto } from 'src/users/dtos/post/CreatePostLabel.dto';
import { CreateUserPostDto } from 'src/users/dtos/post/CreateUserPost.dto';
import { UpdatedUserPostDto } from 'src/users/dtos/post/UpdatedUserPost.dto';
import { CreateUserProfileDto } from 'src/users/dtos/profile/CreateUserProfile.dto';
import { CreateUserParams, UpdateUserParams } from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Profile) private profileRepository: Repository<Profile>,
    @InjectRepository(Post) private postRepository: Repository<Post>,
    @InjectRepository(Label) private labelRepository: Repository<Label>,
  ) {}

  findUsers() {
    return this.userRepository.find({
      relations: ['profile', 'posts', 'posts.labels'],
    });
  }

  async findPosts() {
    return await this.postRepository.find({
      relations: ['labels'],
    });
  }

  createUser(userDetails: CreateUserParams) {
    const newUser = this.userRepository.create({
      ...userDetails,
      createdAt: new Date(),
    });
    return this.userRepository.save(newUser);
  }

  updateUser(id: number, updateUserDetails: UpdateUserParams) {
    return this.userRepository.update({ id }, { ...updateUserDetails });
  }
  deleteUser(id: number) {
    return this.userRepository.delete({ id });
  }

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

  async updateUserProfile(id: number, createUserProfileDto) {
    return await this.profileRepository.update(
      { id },
      { ...createUserProfileDto },
    );
  }

  async createUserPost(id: number, createUserPostDto: CreateUserPostDto) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    const newPost = this.postRepository.create({
      ...createUserPostDto,
      user,
    });
    return await this.postRepository.save(newPost);
  }

  async updateUserPost(id: number, updateUserPostDto: UpdatedUserPostDto) {
    return await this.postRepository.update({ id }, { ...updateUserPostDto });
  }

  async deletePostById(id: number) {
    return await this.postRepository.delete({ id });
  }

  async createPostLabel(id: number, createPostLabelDto: CreatePostLabelDto) {
    const post = await this.postRepository.findOne({
      where: { id: id },
      relations: ['labels'],
    });

    const newLabel = this.labelRepository.create({
      ...createPostLabelDto,
      posts: [post],
    });
    return await this.labelRepository.save(newLabel);
  }

  async updatePostLabel(id: number, createPostLabelDto) {
    return await this.labelRepository.update({ id }, { ...createPostLabelDto });
  }
}
