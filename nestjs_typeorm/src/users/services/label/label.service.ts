import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostLabelDto } from 'src/users/dtos/label/CreatePostLabel.dto';
import { UpdatePostLabelDto } from 'src/users/dtos/label/UpdatePostLabel.dto';
import { Label } from 'src/users/entities/Label';
import { Post } from 'src/users/entities/Posts';
import { Repository } from 'typeorm';

@Injectable()
export class LabelService {
  constructor(
    @InjectRepository(Label) private labelRepository: Repository<Label>,
    @InjectRepository(Post) private postRepository: Repository<Post>,
  ) {}

  async findlabels() {
    return await this.labelRepository.find({ relations: ['posts'] });
  }

  async createPostLabel(id: number, createPostLabelDto: CreatePostLabelDto) {
    const post = await this.postRepository.findOne({
      where: { id: id },
      relations: ['labels'],
    });

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
