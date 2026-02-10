import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { BlogSourcesService } from './blog-sources.service';
import { CreateBlogSourceDto } from './dto/create-blog-source.dto';
import { UpdateBlogSourceDto } from './dto/update-blog-source.dto';

@Controller('blog-sources')
export class BlogSourcesController {
  constructor(private readonly blogSourcesService: BlogSourcesService) {}

  @Post()
  create(@Body() createBlogSourceDto: CreateBlogSourceDto) {
    return this.blogSourcesService.create(createBlogSourceDto);
  }

  @Get()
  findAll(@Query('includeInactive') includeInactive?: string) {
    return this.blogSourcesService.findAll(includeInactive === 'true');
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.blogSourcesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBlogSourceDto: UpdateBlogSourceDto,
  ) {
    return this.blogSourcesService.update(id, updateBlogSourceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.blogSourcesService.remove(id);
  }
}
