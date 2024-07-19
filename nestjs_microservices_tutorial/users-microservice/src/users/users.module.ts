import { Module } from '@nestjs/common';
import { UserMicroserviceController } from './controller/users.controller';
import { UsersService } from './services/user.service';
import { User } from 'src/typeorm/entities/User';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserMicroserviceController],
  providers: [UsersService],
})
export class UsersModule {}
