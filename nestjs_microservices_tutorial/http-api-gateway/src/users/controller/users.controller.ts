import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserDto } from '../dtos/CreateUser.dto';

@Controller('users')
export class UsersController {
  constructor(@Inject('NATS_SERVICE') private natsClient: ClientProxy) {
    console.log('UsersController created');
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    console.log('Creating user', createUserDto);
    return this.natsClient.send({ cmd: 'createUser' }, createUserDto);
  }
}
