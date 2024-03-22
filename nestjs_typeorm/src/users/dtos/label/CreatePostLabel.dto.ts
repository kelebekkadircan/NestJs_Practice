import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePostLabelDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
