import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';

import { AuthGuard } from '../auth/auth.guard';
import { SearchQueryDto } from './dto/search-query.dto';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get()
  searchPosts(@Query() query: SearchQueryDto) {
    return this.searchService.search(query);
  }

  @Get('bookmarks')
  @UseGuards(AuthGuard)
  searchBookmarkPosts(@Req() req, @Query() query: SearchQueryDto) {
    const user = req.user;
    return this.searchService.searchBookmarks({ query, user });
  }
}
