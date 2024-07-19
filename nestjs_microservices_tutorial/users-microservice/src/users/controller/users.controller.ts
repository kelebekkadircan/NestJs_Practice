import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { CreateUserDto } from '../dto/CreateUser.dto';
import { UsersService } from '../services/user.service';

@Controller('users')
export class UserMicroserviceController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern({ cmd: 'createUser' })
  async createUser(@Payload() data: CreateUserDto) {
    console.log('Received data USERS MICROSERVICE', data);
    return await this.usersService.createUser(data);
  }

  @EventPattern('paymentCreated')
  paymentCreated(@Payload() data: any) {
    console.log('Received data USERS MICROSERVICE FOR PAYMENT CREATED', data);
  }
}
