import { Controller, Get, Query } from '@nestjs/common';

import { SearchQueryDto } from './dto/search-query.dto';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get('/blogs')
  searchBlogPost(@Query() query: SearchQueryDto) {
    return this.searchService.search({
      ...query,
      type: ['RSS', 'ATOM', 'SCRAPING'],
    });
  }

  @Get('/youtubes')
  searchYoutube(@Query() query: SearchQueryDto) {
    return this.searchService.search({ ...query, type: ['YOUTUBE'] });
  }
}
