import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Request } from 'express';

import { AdminGuard } from '../auth/admin.guard';
import { AuthGuard } from '../auth/auth.guard';
import { UsersGuard } from '../auth/users.guard';
import { Users } from '../database/generated/prisma/client';
import { PostQueryDto } from './dto/post-query.dto';
import { UpdateDisplayDto } from './dto/update-display.dto';
import { UpdateKeywordDto } from './dto/update-keyword.dto';
import { UpdateThumbnailDto } from './dto/update-thumbnail.dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  @UseGuards(UsersGuard)
  findDisplay(
    @Req() req: Request & { user?: Users },
    @Query() query: PostQueryDto,
  ) {
    const user = req.user;

    return this.postsService.findDisplayPosts({ query, user });
  }

  @Get('bookmarks')
  @UseGuards(AuthGuard)
  findDisplayWithBookmark(
    @Req() req: Request & { user: Users },
    @Query() query: PostQueryDto,
  ) {
    const user = req.user;

    return this.postsService.findDisplayBookmarks({ query, user });
  }

  @CacheTTL(60 * 1000)
  @Get('all')
  @UseGuards(AdminGuard)
  @UseInterceptors(CacheInterceptor)
  findAll(@Query() query: PostQueryDto) {
    return this.postsService.findAll(query);
  }

  @Put(':id/keywords')
  @UseGuards(AdminGuard)
  updateKeywords(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() { keywords }: UpdateKeywordDto,
  ) {
    return this.postsService.updateKeywords(id, keywords);
  }

  @Patch('need-image-update')
  @UseGuards(AdminGuard)
  updateNeedImageUpdate() {
    return this.postsService.updatePostsWithExternalImages();
  }

  @CacheTTL(60 * 1000)
  @Get(':id')
  @UseInterceptors(CacheInterceptor)
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.postsService.findOne(id);
  }

  @Put(':id/view')
  @UseGuards(UsersGuard)
  viewPosts(
    @Req() req: Request & { user?: Users },
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    const user = req.user;
    const sessionId = req.headers['sessionid'] as string;

    return this.postsService.viewPost({ id, sessionId, user });
  }

  @Post(':id/bookmarks')
  @UseGuards(AuthGuard)
  bookmarkPost(
    @Req() req: Request & { user: Users },
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    const user = req.user;

    return this.postsService.bookmarkPost({ id, user });
  }

  @Patch(':id/display')
  @UseGuards(AdminGuard)
  updateDisplay(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateDisplayDto: UpdateDisplayDto,
  ) {
    return this.postsService.updateDisplay(id, updateDisplayDto.isDisplay);
  }

  @Put(':id/thumbnail')
  @UseGuards(AdminGuard)
  updateThumbnail(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateThumbnailDto: UpdateThumbnailDto,
  ) {
    return this.postsService.updateThumbnail(id, updateThumbnailDto.imageUrl);
  }

  @Delete(':id')
  @UseGuards(AdminGuard)
  deletePost(@Param('id', ParseUUIDPipe) id: string) {
    return this.postsService.deletePost(id);
  }
}
