import { UserModel } from '../entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { UserCreateDTO } from '../dtos/user/user-create.dto';
import { UserUpdateDTO } from '../dtos/user/user-update.dto';
import { BaseService } from '@app/common/interfaces/base/service.base.interface';
import { I18nHttpException } from '@app/common/exceptions/custom/i18n-http-exception';
import { PaginateQuery, Paginated, paginate } from 'nestjs-paginate';
import { USER_PAGINATION_CONFIG } from '../configs/user-paginate-config';

@Injectable()
export class UserService implements BaseService<UserModel> {
  constructor(
    @InjectRepository(UserModel)
    private readonly userRepository: Repository<UserModel>,
  ) {}

  async create(userData: UserCreateDTO): Promise<UserModel> {
    const user = this.userRepository.create(userData);
    return await this.userRepository.save(user);
  }

  async update(id: string, userUpdateDto: UserUpdateDTO): Promise<UserModel> {
    const user = await this.findOne(id);
    if (!user) {
      throw new I18nHttpException('common.user.notFound', 404);
    }
    await this.userRepository.update({ id }, userUpdateDto)
    return await this.findOne(id)
  }

  async findAll(options: FindManyOptions<UserModel>): Promise<UserModel[]> {
    return await this.userRepository.find(options);
  }

  async findAllPaginated(query: PaginateQuery, relations): Promise<Paginated<UserModel>> {
    const users = await paginate(query, this.userRepository, {
      ...USER_PAGINATION_CONFIG,
      relations,
    });
    return users;
  }

  async findOne(id: string): Promise<UserModel> {
    return await this.userRepository.findOne({ where: { id } });
  }

  async findOneBy(options: FindOneOptions<UserModel>): Promise<UserModel> {
    return await this.userRepository.findOne(options);
  }

  async delete(id: string): Promise<UserModel> {
    const user = await this.findOne(id);
    if (!user) {
      throw new I18nHttpException('common.user.notFound', 404);
    }
    return await this.userRepository.remove(user);
  }
}
