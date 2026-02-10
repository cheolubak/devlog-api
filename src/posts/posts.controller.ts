import { Controller, Get, Param, Patch, Body, Query } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostQueryDto } from './dto/post-query.dto';
import { UpdateDisplayDto } from './dto/update-display.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  findAll(@Query() query: PostQueryDto) {
    return this.postsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(id);
  }

  @Patch(':id/display')
  updateDisplay(@Param('id') id: string, @Body() updateDisplayDto: UpdateDisplayDto) {
    return this.postsService.updateDisplay(id, updateDisplayDto.isDisplay);
  }
}
