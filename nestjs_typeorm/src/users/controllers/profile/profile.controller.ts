import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserProfileDto } from 'src/users/dtos/profile/CreateUserProfile.dto';
import { UpdateUserProfileDto } from 'src/users/dtos/profile/UpdateUserProfile.dto';
import { ProfileService } from 'src/users/services/profile/profile.service';

@Controller('profiles')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @Get()
  async getProfiles() {
    return await this.profileService.getProfiles();
  }

  @Post(':id')
  async createUserProfile(
    @Param('id', ParseIntPipe) id: number, // dto üzerinden kontrolün nasıl yapılır bak
    @Body() createUserProfileDto: CreateUserProfileDto,
  ) {
    return await this.profileService.createUserProfile(
      id,
      createUserProfileDto,
    );
  }

  @Put(':id')
  async updateUserProfile(
    @Param('id', ParseIntPipe) id: number, // dto üzerinden kontrolün nasıl yapılır bak
    @Body() updateProfileDto: UpdateUserProfileDto,
  ) {
    return await this.profileService.updateUserProfile(id, updateProfileDto);
  }
}