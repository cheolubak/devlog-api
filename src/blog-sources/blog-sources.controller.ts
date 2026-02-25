import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

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

  @Get('youtubes')
  findAllYoutubes() {
    return this.blogSourcesService.findAllYoutube();
  }

  @Get('blogs')
  findAllBlogs() {
    return this.blogSourcesService.findAllBlog();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.blogSourcesService.findOne(id);
  }

  @Patch('need-image-update')
  updateNeedImageUpdate() {
    return this.blogSourcesService.updateSourcesWithExternalIcons();
  }

  @Patch(':id/image-update')
  @UseInterceptors(FileInterceptor('image'))
  updateImage(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.blogSourcesService.updateThumbnailWithFile(id, file);
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
