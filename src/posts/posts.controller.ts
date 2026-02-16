import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Query,
} from '@nestjs/common';

import { FeedType } from '../database/generated/prisma';
import { PostQueryDto } from './dto/post-query.dto';
import { UpdateDisplayDto } from './dto/update-display.dto';
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

  @Get('blog')
  findBlog(@Query() query: PostQueryDto) {
    return this.postsService.findDisplayPosts({
      ...query,
      type: [FeedType.RSS, FeedType.ATOM, FeedType.SCRAPING],
    });
  }

  @Get('youtube')
  findYoutube(@Query() query: PostQueryDto) {
    return this.postsService.findDisplayPosts({
      ...query,
      type: [FeedType.YOUTUBE],
    });
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

  @Delete(':id')
  deletePost(@Param('id') id: string) {
    return this.postsService.deletePost(id);
  }
}
