import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreatePostLabelDto } from 'src/users/dtos/label/CreatePostLabel.dto';
import { UpdatePostLabelDto } from 'src/users/dtos/label/UpdatePostLabel.dto';
import { LabelService } from 'src/users/services/label/label.service';

@Controller('labels')
export class LabelController {
  constructor(private labelService: LabelService) {}

  @Get()
  async getLabels() {
    const labels = await this.labelService.findlabels();
    return labels;
  }

  @Post(':id')
  async createPostLabel(
    @Param('id', ParseIntPipe) id: number,
    @Body() createPostLabelDto: CreatePostLabelDto,
  ) {
    return await this.labelService.createPostLabel(id, createPostLabelDto);
  }

  @Put(':id')
  async updatePostLabel(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatedUserPostDto: UpdatePostLabelDto,
  ) {
    return await this.labelService.updatePostLabel(id, updatedUserPostDto);
  }
}
