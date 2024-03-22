import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserPostDto } from 'src/users/dtos/post/CreateUserPost.dto';
import { UpdatedUserPostDto } from 'src/users/dtos/post/UpdatedUserPost.dto';
import { Post } from 'src/users/entities/Posts';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private postRepository: Repository<Post>,
    private readonly userService: UsersService,
  ) {}

  async createUserPost(id: number, createUserPostDto: CreateUserPostDto) {
    const user = await this.userService.findUsersById(id);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    const newPost = this.postRepository.create({
      ...createUserPostDto,
      user,
    });
    return await this.postRepository.save(newPost);
  }

  async findPosts() {
    return await this.postRepository.find({
      relations: ['labels', 'user'],
    });
  }

  async findPostsById(id: number) {
    return await this.postRepository.findOne({
      where: { id: id },
      relations: ['labels', 'user'],
    });
  }

  async updateUserPost(id: number, updateUserPostDto: UpdatedUserPostDto) {
    return await this.postRepository.update({ id }, { ...updateUserPostDto });
  }

  async deletePostById(id: number) {
    return await this.postRepository.delete({ id });
  }
}
