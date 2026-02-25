import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Put,
  Query,
} from '@nestjs/common';

import { PostQueryDto } from './dto/post-query.dto';
import { UpdateDisplayDto } from './dto/update-display.dto';
import { UpdateKeywordDto } from './dto/update-keyword.dto';
import { UpdateThumbnailDto } from './dto/update-thumbnail.dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  findDisplay(@Query() query: PostQueryDto) {
    return this.postsService.findDisplayPosts(query);
  }

  @Get('all')
  findAll(@Query() query: PostQueryDto) {
    return this.postsService.findAll(query);
  }

  @Put(':id/keywords')
  updateKeywords(
    @Param('id') id: string,
    @Body() { keywords }: UpdateKeywordDto,
  ) {
    return this.postsService.updateKeywords(id, keywords);
  }

  @Patch('need-image-update')
  updateNeedImageUpdate() {
    return this.postsService.updatePostsWithExternalImages();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(id);
  }

  @Patch(':id/display')
  updateDisplay(
    @Param('id') id: string,
    @Body() updateDisplayDto: UpdateDisplayDto,
  ) {
    return this.postsService.updateDisplay(id, updateDisplayDto.isDisplay);
  }

  @Put(':id/thumbnail')
  updateThumbnail(
    @Param('id') id: string,
    @Body() updateThumbnailDto: UpdateThumbnailDto,
  ) {
    return this.postsService.updateThumbnail(id, updateThumbnailDto.imageUrl);
  }

  @Delete(':id')
  deletePost(@Param('id') id: string) {
    return this.postsService.deletePost(id);
  }
}
