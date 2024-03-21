import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users/users.controller';
import { UsersService } from './services/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/User';
import { Profile } from 'src/entities/Profile';
import { Post } from 'src/entities/Posts';
import { Label } from 'src/entities/Label';

@Module({
  imports: [TypeOrmModule.forFeature([User, Profile, Post, Label])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
