import { FilterOperator, PaginateConfig } from 'nestjs-paginate';
import { UserModel } from '../entities/user.entity';

export const USER_PAGINATION_CONFIG: PaginateConfig<UserModel> = {
  relations: [],
  searchableColumns: ['email'],
  sortableColumns: ['createdAt', 'updatedAt', 'email'],
  defaultSortBy: [['createdAt', 'DESC']],
  filterableColumns: {
    id: [FilterOperator.EQ],
    email: [FilterOperator.EQ]
  },
};
