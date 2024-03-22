import { PartialType } from '@nestjs/mapped-types';
import { CreatePostLabelDto } from './CreatePostLabel.dto';

export class UpdatePostLabelDto extends PartialType(CreatePostLabelDto) {}
