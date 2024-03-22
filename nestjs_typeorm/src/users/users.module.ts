import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users/users.controller';
import { UsersService } from './services/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/User';
import { Profile } from 'src/users/entities/Profile';
import { Post } from 'src/users/entities/Posts';
import { Label } from 'src/users/entities/Label';
import { ProfileController } from './controllers/profile/profile.controller';
import { ProfileService } from './services/profile/profile.service';
import { PostsController } from './controllers/posts/posts.controller';
import { PostsService } from './services/posts/posts.service';
import { LabelController } from './controllers/label/label.controller';
import { LabelService } from './services/label/label.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Profile, Post, Label])],
  controllers: [
    UsersController,
    ProfileController,
    PostsController,
    LabelController,
  ],
  providers: [UsersService, ProfileService, PostsService, LabelService],
})
export class UsersModule {}
