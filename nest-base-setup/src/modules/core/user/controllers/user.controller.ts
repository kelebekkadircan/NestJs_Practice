import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Put,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { UserCreateDTO } from '../dtos/user/user-create.dto';
import { UserUpdateDTO } from '../dtos/user/user-update.dto';
import { UserModel } from '../entities/user.entity';
import { BaseController } from '@app/common/interfaces/base/controller.base.interface';
import { PromiseResponse } from '@app/common/interfaces';
import { ApiPaginationQuery, Paginate, PaginateQuery } from 'nestjs-paginate';
import { RelationDecorator } from 'nestjs-paginate-relations-filter-middleware';
import { USER_PAGINATION_CONFIG } from '../configs/user-paginate-config';
import { ApiTags } from '@nestjs/swagger';

@Controller({ path: 'user', version: '1' })
@ApiTags('User')
export class UserController implements BaseController<UserModel> {
  constructor(private readonly userService: UserService) {}

  @Post('/')
  async create(@Body() data: UserCreateDTO): PromiseResponse<UserModel> {
    return { success: true, data: await this.userService.create(data) };
  }

  @Get('/')
  @ApiPaginationQuery(USER_PAGINATION_CONFIG)
  async findAll(
    @Paginate() query: PaginateQuery,
    @RelationDecorator() relations: any,
  ): PromiseResponse<UserModel[]> {
    const response = await this.userService.findAllPaginated(query, relations);
    return { success: true, ...response };
  }

  @Get('/:id')
  async findOne(@Param('id') id: string): PromiseResponse<UserModel> {
    return { success: true, data: await this.userService.findOne(id) };
  }

  @Put('/:id')
  async update(
    @Param('id') id: string,
    @Body() data: UserUpdateDTO,
  ): PromiseResponse<UserModel> {
    return { success: true, data: await this.userService.update(id, data) };
  }

  @Delete('/:id')
  async delete(@Param('id') id: string): PromiseResponse<UserModel> {
    return { success: true, data: await this.userService.delete(id) };
  }
}
