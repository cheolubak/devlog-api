import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { FetchStatus } from '../database/generated/prisma';
import { PrismaService } from '../database/prisma.service';
import { CreateBlogSourceDto } from './dto/create-blog-source.dto';
import { UpdateBlogSourceDto } from './dto/update-blog-source.dto';

@Injectable()
export class BlogSourcesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createBlogSourceDto: CreateBlogSourceDto) {
    const existingSource = await this.prisma.blogSource.findUnique({
      where: { url: createBlogSourceDto.url },
    });

    if (existingSource) {
      throw new ConflictException('Blog source with this URL already exists');
    }

    return this.prisma.blogSource.create({
      data: createBlogSourceDto,
    });
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
    const updateData: any = {
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
}
