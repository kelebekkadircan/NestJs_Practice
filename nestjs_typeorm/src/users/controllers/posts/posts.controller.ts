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
import { CreateUserPostDto } from 'src/users/dtos/post/CreateUserPost.dto';
import { UpdatedUserPostDto } from 'src/users/dtos/post/UpdatedUserPost.dto';
import { PostsService } from 'src/users/services/posts/posts.service';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Get()
  async getPosts() {
    const posts = await this.postsService.findPosts();
    return posts;
  }

  @Post(':id')
  createUserPost(
    @Param('id', ParseIntPipe) id: number,
    @Body() createUserPostDto: CreateUserPostDto,
  ) {
    return this.postsService.createUserPost(id, createUserPostDto);
  }

  @Put(':id/posts')
  async updateUserPost(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatedUserPostDto: UpdatedUserPostDto,
  ) {
    return await this.postsService.updateUserPost(id, updatedUserPostDto);
  }

  @Delete(':id/posts')
  async deletePostById(@Param('id', ParseIntPipe) id: number) {
    return await this.postsService.deletePostById(id);
  }
}
