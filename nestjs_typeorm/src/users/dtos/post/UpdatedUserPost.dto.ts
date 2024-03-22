import { PartialType } from '@nestjs/mapped-types';
import { CreateUserPostDto } from './CreateUserPost.dto';

export class UpdatedUserPostDto extends PartialType(CreateUserPostDto) {}
