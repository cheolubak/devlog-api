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
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiSecurity, ApiTags } from '@nestjs/swagger';

import { AdminGuard } from '../auth/admin.guard';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import { BlogSourcesService } from './blog-sources.service';
import {
  CreateBlogSourceDto,
  createBlogSourceSchema,
} from './dto/create-blog-source.dto';
import {
  UpdateBlogSourceDto,
  updateBlogSourceSchema,
} from './dto/update-blog-source.dto';

@ApiTags('Blog Sources')
@Controller('blog-sources')
export class BlogSourcesController {
  constructor(private readonly blogSourcesService: BlogSourcesService) {}

  @ApiOperation({ summary: '블로그 소스 생성' })
  @ApiSecurity('admin-api-key')
  @Post()
  @UseGuards(AdminGuard)
  create(
    @Body(new ZodValidationPipe(createBlogSourceSchema))
    createBlogSourceDto: CreateBlogSourceDto,
  ) {
    return this.blogSourcesService.create(createBlogSourceDto);
  }

  @ApiOperation({ summary: '블로그 소스 전체 조회' })
  @CacheTTL(5 * 60 * 1000)
  @Get()
  @UseInterceptors(CacheInterceptor)
  findAll(@Query('includeInactive') includeInactive?: string) {
    return this.blogSourcesService.findAll(includeInactive === 'true');
  }

  @ApiOperation({ summary: '유튜브 소스 전체 조회' })
  @Get('youtubes')
  findAllYoutubes() {
    return this.blogSourcesService.findAllYoutube();
  }

  @ApiOperation({ summary: '블로그 소스 전체 조회 (블로그만)' })
  @Get('blogs')
  findAllBlogs() {
    return this.blogSourcesService.findAllBlog();
  }

  @ApiOperation({ summary: '블로그 소스 단일 조회' })
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.blogSourcesService.findOne(id);
  }

  @ApiOperation({ summary: '외부 아이콘 소스 업데이트' })
  @ApiSecurity('admin-api-key')
  @Patch('need-image-update')
  @UseGuards(AdminGuard)
  updateNeedImageUpdate() {
    return this.blogSourcesService.updateSourcesWithExternalIcons();
  }

  @ApiOperation({ summary: '블로그 소스 이미지 수정' })
  @ApiSecurity('admin-api-key')
  @Patch(':id/image-update')
  @UseGuards(AdminGuard)
  @UseInterceptors(
    FileInterceptor('image', {
      fileFilter: (_req, file, callback) => {
        if (!file.mimetype.startsWith('image/')) {
          callback(new Error('Only image files are allowed'), false);
          return;
        }
        callback(null, true);
      },
      limits: { fileSize: 5 * 1024 * 1024 },
    }),
  )
  updateImage(
    @Param('id', ParseUUIDPipe) id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.blogSourcesService.updateThumbnailWithFile(id, file);
  }

  @ApiOperation({ summary: '블로그 소스 수정' })
  @ApiSecurity('admin-api-key')
  @Patch(':id')
  @UseGuards(AdminGuard)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(new ZodValidationPipe(updateBlogSourceSchema))
    updateBlogSourceDto: UpdateBlogSourceDto,
  ) {
    return this.blogSourcesService.update(id, updateBlogSourceDto);
  }

  @ApiOperation({ summary: '블로그 소스 삭제' })
  @ApiSecurity('admin-api-key')
  @Delete(':id')
  @UseGuards(AdminGuard)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.blogSourcesService.remove(id);
  }
}
