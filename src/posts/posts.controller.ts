import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import {
  BadRequestException,
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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { Request } from 'express';

import { AdminGuard } from '../auth/admin.guard';
import { AuthGuard } from '../auth/auth.guard';
import { UsersGuard } from '../auth/users.guard';
import {
  ApiZodBody,
  ApiZodQuery,
} from '../common/decorators/api-zod.decorator';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import { Users } from '../database/generated/prisma/client';
import { PostQueryDto, postQuerySchema } from './dto/post-query.dto';
import {
  UpdateDisplayDto,
  updateDisplaySchema,
} from './dto/update-display.dto';
import {
  UpdateKeywordDto,
  updateKeywordSchema,
} from './dto/update-keyword.dto';
import {
  UpdateThumbnailDto,
  updateThumbnailSchema,
} from './dto/update-thumbnail.dto';
import { PostsService } from './posts.service';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @ApiOperation({ summary: '디스플레이 포스트 목록 조회' })
  @ApiZodQuery(postQuerySchema)
  @Get()
  @UseGuards(UsersGuard)
  findDisplay(
    @Req() req: Request & { user?: Users },
    @Query(new ZodValidationPipe(postQuerySchema)) query: PostQueryDto,
  ) {
    const user = req.user;

    return this.postsService.findDisplayPosts({ query, user });
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: '북마크 포스트 목록 조회' })
  @ApiZodQuery(postQuerySchema)
  @Get('bookmarks')
  @UseGuards(AuthGuard)
  findDisplayWithBookmark(
    @Req() req: Request & { user: Users },
    @Query(new ZodValidationPipe(postQuerySchema)) query: PostQueryDto,
  ) {
    const user = req.user;

    return this.postsService.findDisplayBookmarks({ query, user });
  }

  @ApiOperation({ summary: '전체 포스트 목록 조회' })
  @ApiSecurity('admin-api-key')
  @ApiZodQuery(postQuerySchema)
  @CacheTTL(60 * 1000)
  @Get('all')
  @UseGuards(AdminGuard)
  @UseInterceptors(CacheInterceptor)
  findAll(@Query(new ZodValidationPipe(postQuerySchema)) query: PostQueryDto) {
    return this.postsService.findAll(query);
  }

  @ApiOperation({ summary: '포스트 키워드 수정' })
  @ApiSecurity('admin-api-key')
  @ApiZodBody(updateKeywordSchema)
  @Put(':id/keywords')
  @UseGuards(AdminGuard)
  updateKeywords(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(new ZodValidationPipe(updateKeywordSchema))
    { keywords }: UpdateKeywordDto,
  ) {
    return this.postsService.updateKeywords(id, keywords);
  }

  @ApiOperation({ summary: '외부 이미지 포스트 업데이트' })
  @ApiSecurity('admin-api-key')
  @Patch('need-image-update')
  @UseGuards(AdminGuard)
  updateNeedImageUpdate() {
    return this.postsService.updatePostsWithExternalImages();
  }

  @ApiOperation({ summary: '포스트 상세 조회' })
  @CacheTTL(60 * 1000)
  @Get(':id')
  @UseInterceptors(CacheInterceptor)
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.postsService.findOne(id);
  }

  @ApiOperation({ summary: '포스트 조회수 증가' })
  @Put(':id/view')
  @UseGuards(UsersGuard)
  viewPosts(
    @Req() req: Request & { user?: Users },
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    const user = req.user;
    const rawSessionId = req.headers['sessionid'];
    if (!rawSessionId || typeof rawSessionId !== 'string') {
      throw new BadRequestException(
        'sessionid header must be a single string value',
      );
    }
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(rawSessionId)) {
      throw new BadRequestException('sessionid must be a valid UUID');
    }

    return this.postsService.viewPost({ id, sessionId: rawSessionId, user });
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: '포스트 북마크 토글' })
  @Post(':id/bookmarks')
  @UseGuards(AuthGuard)
  bookmarkPost(
    @Req() req: Request & { user: Users },
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    const user = req.user;

    return this.postsService.bookmarkPost({ id, user });
  }

  @ApiOperation({ summary: '포스트 표시 여부 변경' })
  @ApiSecurity('admin-api-key')
  @ApiZodBody(updateDisplaySchema)
  @Patch(':id/display')
  @UseGuards(AdminGuard)
  updateDisplay(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(new ZodValidationPipe(updateDisplaySchema))
    updateDisplayDto: UpdateDisplayDto,
  ) {
    return this.postsService.updateDisplay(id, updateDisplayDto.isDisplay);
  }

  @ApiOperation({ summary: '포스트 썸네일 수정' })
  @ApiSecurity('admin-api-key')
  @ApiZodBody(updateThumbnailSchema)
  @Put(':id/thumbnail')
  @UseGuards(AdminGuard)
  updateThumbnail(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(new ZodValidationPipe(updateThumbnailSchema))
    updateThumbnailDto: UpdateThumbnailDto,
  ) {
    return this.postsService.updateThumbnail(id, updateThumbnailDto.imageUrl);
  }

  @ApiOperation({ summary: '포스트 삭제' })
  @ApiSecurity('admin-api-key')
  @Delete(':id')
  @UseGuards(AdminGuard)
  deletePost(@Param('id', ParseUUIDPipe) id: string) {
    return this.postsService.deletePost(id);
  }
}
