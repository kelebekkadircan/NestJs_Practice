import {
  Controller,
  Get,
  Res,
  Post,
  Req,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateUserDto } from 'src/users/dtos/CreateUserDto';

@Controller('users')
export class UsersController {
  @Get()
  getUsers() {
    return [{ username: 'Kadircan', email: 'kelebekkadircan@gmail.com' }];
  }

  @Get('sortBy')
  getUsersSortBy(@Query('sortBy') sortBy: string) {
    console.log(sortBy);
    return [{ username: 'Kadircan', email: 'kelebekkadircan@gmail.com' }];
  }

  @Get('posts')
  getUsersPosts() {
    return [
      {
        username: 'Kadircan',
        email: 'kelebekkadircan@gmail.com',
        posts: [
          {
            id: 1,
            title: 'Post 1',
            comments: [],
          },
          {
            id: 2,
            title: 'Post 2',
            comments: [],
          },
          {
            id: 3,
            title: 'Post 3',
            comments: [],
          },
        ],
      },
    ];
  }

  @Get('posts/comments')
  getUsersPostsComments() {
    return [
      {
        id: 1,
        title: 'Post Comment 1',
      },
      {
        id: 2,
        title: 'Post Comment 2',
      },
      {
        id: 3,
        title: 'Post Comment 3',
      },
    ];
  }

  @Post('posts/create')
  createPost(@Req() request: Request, @Res() response: Response) {
    console.log(request.body);
    response.send(request.body);
  }

  @Post('create')
  createUser(@Body() userData: CreateUserDto) {
    console.log(userData.email, userData.username);
    return {};
  }

  @Get(':id/:postId')
  getUsersById(@Param('id') id: string, @Param('postId') postId: string) {
    console.log(id, postId);
    return { id, postId };
  }
}
