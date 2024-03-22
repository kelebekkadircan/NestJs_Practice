import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostLabelDto } from 'src/users/dtos/label/CreatePostLabel.dto';
import { UpdatePostLabelDto } from 'src/users/dtos/label/UpdatePostLabel.dto';
import { Label } from 'src/users/entities/Label';
import { Repository } from 'typeorm';
import { PostsService } from '../posts/posts.service';

@Injectable()
export class LabelService {
  constructor(
    @InjectRepository(Label) private labelRepository: Repository<Label>,
    private readonly postService: PostsService,
  ) {}

  async findlabels() {
    return await this.labelRepository.find({ relations: ['posts'] });
  }

  async createPostLabel(id: number, createPostLabelDto: CreatePostLabelDto) {
    const post = await this.postService.findPostsById(id);

    const newLabel = this.labelRepository.create({
      ...createPostLabelDto,
      posts: [post],
    });
    return await this.labelRepository.save(newLabel);
  }

  async updatePostLabel(id: number, updatePostLabelDto: UpdatePostLabelDto) {
    return await this.labelRepository.update({ id }, { ...updatePostLabelDto });
  }
}
