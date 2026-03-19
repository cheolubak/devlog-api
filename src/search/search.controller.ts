import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import {
  Controller,
  Get,
  Query,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

import { AuthGuard } from '../auth/auth.guard';
import { ApiZodQuery } from '../common/decorators/api-zod.decorator';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import { Users } from '../database/generated/prisma/client';
import { SearchQueryDto, searchQuerySchema } from './dto/search-query.dto';
import { SearchService } from './search.service';

@ApiTags('Search')
@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @ApiOperation({ summary: '포스트 검색' })
  @ApiZodQuery(searchQuerySchema)
  @CacheTTL(30 * 1000)
  @Get()
  @UseInterceptors(CacheInterceptor)
  searchPosts(
    @Query(new ZodValidationPipe(searchQuerySchema)) query: SearchQueryDto,
  ) {
    return this.searchService.search(query);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: '북마크 포스트 검색' })
  @ApiZodQuery(searchQuerySchema)
  @Get('bookmarks')
  @UseGuards(AuthGuard)
  searchBookmarkPosts(
    @Req() req: Request & { user: Users },
    @Query(new ZodValidationPipe(searchQuerySchema)) query: SearchQueryDto,
  ) {
    const user = req.user;
    return this.searchService.searchBookmarks({ query, user });
  }
}
