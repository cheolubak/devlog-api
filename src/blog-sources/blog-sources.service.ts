import {
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';

import { FeedType, FetchStatus, Prisma } from '../database/generated/prisma';
import { PrismaService } from '../database/prisma.service';
import { ImageParseService } from '../image-parse/image-parse.service';
import { processInChunks } from '../utils/chunk-parallel';
import { CreateBlogSourceDto } from './dto/create-blog-source.dto';
import { UpdateBlogSourceDto } from './dto/update-blog-source.dto';

@Injectable()
export class BlogSourcesService {
  private readonly logger = new Logger(BlogSourcesService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly imageParseService: ImageParseService,
  ) {}

  async create(createBlogSourceDto: CreateBlogSourceDto) {
    // Normalize percent-encoded URLs to prevent duplicates (e.g. /@%ED%8F%AC vs /@포프티비)
    try {
      createBlogSourceDto.url = decodeURIComponent(createBlogSourceDto.url);
    } catch {
      // If decoding fails, use the original URL
    }

    const existingSource = await this.prisma.blogSource.findUnique({
      where: { url: createBlogSourceDto.url },
    });

    if (existingSource) {
      throw new ConflictException('Blog source with this URL already exists');
    }

    const blogSource = await this.prisma.blogSource.create({
      data: { ...createBlogSourceDto, icon: null },
    });

    if (createBlogSourceDto.icon) {
      await this.updateThumbnail(blogSource.id, createBlogSourceDto.icon);
    }

    return blogSource;
  }

  async findAll(includeInactive = false) {
    const where = includeInactive ? {} : { isActive: true };

    return this.prisma.blogSource.findMany({
      include: {
        _count: {
          select: { posts: true },
        },
      },
      orderBy: { createdAt: 'desc' },
      where,
    });
  }

  async findAllYoutube() {
    const where = { isActive: true, type: FeedType.YOUTUBE };

    return this.prisma.blogSource.findMany({
      include: {
        _count: {
          select: { posts: true },
        },
      },
      orderBy: { lastFetchedAt: 'asc' },
      where,
    });
  }

  async findAllBlog() {
    return this.prisma.blogSource.findMany({
      include: {
        _count: {
          select: { posts: true },
        },
      },
      orderBy: { lastFetchedAt: 'asc' },
      where: {
        isActive: true,
        type: {
          in: [FeedType.RSS, FeedType.ATOM, FeedType.SCRAPING],
        },
      },
    });
  }

  async findOne(id: string) {
    const source = await this.prisma.blogSource.findUnique({
      include: {
        _count: {
          select: { posts: true },
        },
        posts: {
          orderBy: { originalPublishedAt: 'desc' },
          select: {
            id: true,
            isDisplay: true,
            originalPublishedAt: true,
            title: true,
          },
          take: 10,
        },
      },
      where: { id },
    });

    if (!source) {
      throw new NotFoundException('Blog source not found');
    }

    return source;
  }

  async update(id: string, updateBlogSourceDto: UpdateBlogSourceDto) {
    const source = await this.prisma.blogSource.findUnique({
      where: { id },
    });

    if (!source) {
      throw new NotFoundException('Blog source not found');
    }

    if (updateBlogSourceDto.url) {
      const existingSource = await this.prisma.blogSource.findFirst({
        where: {
          id: { not: id },
          url: updateBlogSourceDto.url,
        },
      });

      if (existingSource) {
        throw new ConflictException('Blog source with this URL already exists');
      }
    }

    return this.prisma.blogSource.update({
      data: updateBlogSourceDto,
      where: { id },
    });
  }

  async remove(id: string) {
    const source = await this.prisma.blogSource.findUnique({
      where: { id },
    });

    if (!source) {
      throw new NotFoundException('Blog source not found');
    }

    return this.prisma.blogSource.update({
      data: { isActive: false },
      where: { id },
    });
  }

  async updateFetchStatus(
    id: string,
    status: FetchStatus,
    error?: string,
    newPostsCount?: number,
  ) {
    const updateData: Prisma.BlogSourceUncheckedUpdateInput = {
      lastFetchedAt: new Date(),
      lastFetchError: error || null,
      lastFetchStatus: status,
    };

    if (newPostsCount !== undefined) {
      updateData.totalPostsFetched = {
        increment: newPostsCount,
      };
    }

    return this.prisma.blogSource.update({
      data: updateData,
      where: { id },
    });
  }

  async findAllActive() {
    return this.prisma.blogSource.findMany({
      orderBy: { lastFetchedAt: 'asc' },
      where: { isActive: true },
    });
  }

  async uploadThumbnail(id: string, imageUrl: string) {
    const url = await this.imageParseService.uploadImageAsWebp(
      imageUrl,
      `thumbnails/sources/${id}`,
    );

    return url.startsWith('/') ? url : `/${url}`;
  }

  async updateThumbnail(id: string, imageUrl: string) {
    try {
      const icon = await this.uploadThumbnail(id, imageUrl);

      const updated = await this.prisma.blogSource.update({
        data: {
          icon,
        },
        where: { id },
      });

      this.logger.log(`Updated icon for source ${id}: ${icon}`);
      return updated;
    } catch (e) {
      this.logger.error(
        `Failed to update icon for source ${id} : ${e.message}`,
      );
      return null;
    }
  }

  async updateSourcesWithExternalIcons() {
    const sources = await this.prisma.blogSource.findMany({
      where: {
        icon: {
          not: null,
          startsWith: 'https',
        },
        isActive: true,
        NOT: {
          icon: {
            startsWith: '/thumbnails/sources',
          },
        },
      },
    });

    const results = await processInChunks(
      sources,
      async (source) => {
        const sourceUrl = source.blogUrl.split('/').at(0) ?? '';
        const imageUrl = source.icon.startsWith('https')
          ? source.icon
          : `${sourceUrl}${source.icon.startsWith('/') ? source.icon : `/${source.icon}`}`;
        return this.updateThumbnail(source.id, imageUrl);
      },
      5,
    );

    const successCount = results.filter(Boolean).length;
    const failedCount = results.length - successCount;

    this.logger.log(
      `Updated thumbnails for ${successCount.toLocaleString()} posts, failed for ${failedCount.toLocaleString()} posts (total: ${sources.length.toLocaleString()})`,
    );

    return { failed: failedCount, success: successCount };
  }

  async updateThumbnailWithFile(id: string, file: Express.Multer.File) {
    try {
      const url = await this.imageParseService.uploadFileAsWebp(
        file,
        `/thumbnails/sources/${id}`,
      );

      const updated = await this.prisma.blogSource.update({
        data: {
          icon: url.startsWith('/') ? url : `/${url}`,
        },
        where: { id },
      });

      this.logger.log(`Updated icon for source ${id}: ${url}`);
      return updated;
    } catch (e) {
      this.logger.error(
        `Failed to update icon for source ${id} : ${e.message}`,
      );
      return null;
    }
  }
}
