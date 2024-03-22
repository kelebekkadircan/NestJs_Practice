import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserPostDto } from 'src/users/dtos/post/CreateUserPost.dto';
import { UpdatedUserPostDto } from 'src/users/dtos/post/UpdatedUserPost.dto';
import { Post } from 'src/users/entities/Posts';
import { User } from 'src/users/entities/User';
import { Repository } from 'typeorm';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private postRepository: Repository<Post>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

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

  async findPosts() {
    return await this.postRepository.find({
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
