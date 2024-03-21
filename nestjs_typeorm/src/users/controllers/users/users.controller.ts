import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { UpdateUserDto } from 'src/users/dtos/UpdateUser.dto';
import { CreatePostLabelDto } from 'src/users/dtos/post/CreatePostLabel.dto';
import { CreateUserPostDto } from 'src/users/dtos/post/CreateUserPost.dto';
import { UpdatedUserPostDto } from 'src/users/dtos/post/UpdatedUserPost.dto';
import { CreateUserProfileDto } from 'src/users/dtos/profile/CreateUserProfile.dto';
import { UsersService } from 'src/users/services/users/users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async getUsers() {
    const users = await this.usersService.findUsers();
    return users;
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Put(':id')
  async updateUserById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.usersService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  async deleteUserById(@Param('id', ParseIntPipe) id: number) {
    return await this.usersService.deleteUser(id);
  }

  @Post(':id/profiles')
  async createUserProfile(
    @Param('id', ParseIntPipe) id: number, // dto üzerinden kontrolün nasıl yapılır bak
    @Body() createUserProfileDto: CreateUserProfileDto,
  ) {
    return await this.usersService.createUserProfile(id, createUserProfileDto);
  }

  @Put(':id/profiles')
  async updateUserProfile(
    @Param('id', ParseIntPipe) id: number, // dto üzerinden kontrolün nasıl yapılır bak
    @Body() createUserProfileDto,
  ) {
    return await this.usersService.updateUserProfile(id, createUserProfileDto);
  }

  @Get('posts')
  async getPosts() {
    const posts = await this.usersService.findPosts();
    return posts;
  }

  @Post(':id/posts')
  createUserPost(
    @Param('id', ParseIntPipe) id: number,
    @Body() createUserPostDto: CreateUserPostDto,
  ) {
    return this.usersService.createUserPost(id, createUserPostDto);
  }

  @Post(':id/label')
  async createPostLabel(
    @Param('id', ParseIntPipe) id: number,
    @Body() createPostLabelDto: CreatePostLabelDto,
  ) {
    return await this.usersService.createPostLabel(id, createPostLabelDto);
  }

  @Put(':id/posts')
  async updateUserPost(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatedUserPostDto: UpdatedUserPostDto,
  ) {
    return await this.usersService.updateUserPost(id, updatedUserPostDto);
  }

  @Put(':id/label')
  async updatePostLabel(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatedUserPostDto,
  ) {
    return await this.usersService.updatePostLabel(id, updatedUserPostDto);
  }

  @Delete(':id/posts')
  async deletePostById(@Param('id', ParseIntPipe) id: number) {
    return await this.usersService.deletePostById(id);
  }
}
