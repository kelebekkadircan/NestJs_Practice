import {
  Controller,
  Get,
  Res,
  Post,
  Req,
  Body,
  Param,
  Query,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
  ParseBoolPipe,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateUserDto } from 'src/users/dtos/CreateUserDto';
import { ValidateCreateUserPipe } from 'src/users/pipes/validate-create-user/validate-create-user.pipe';
import { UsersService } from 'src/users/services/users/users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  getUsers() {
    return this.userService.fetchUsers();
  }

  @Get('sortBy')
  getUsersSortBy(@Query('sortDesc', ParseBoolPipe) sortDesc: boolean) {
    console.log(sortDesc);
    return { sortDesc: sortDesc };
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
  @UsePipes(new ValidationPipe())
  createUser(@Body(ValidateCreateUserPipe) userData: CreateUserDto) {
    console.log(userData.email, userData.username, userData.age.toPrecision());
    return this.userService.createUser(userData);
  }

  @Get(':id')
  getUsersById(@Param('id', ParseIntPipe) id: number) {
    console.log(id);
    const user = this.userService.fetchUserById(id);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    } else {
      return user;
    }
  }
}
