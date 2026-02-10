import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateBlogSourceDto } from './dto/create-blog-source.dto';
import { UpdateBlogSourceDto } from './dto/update-blog-source.dto';
import { FetchStatus } from '../database/generated/prisma';

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
      where,
      orderBy: { createdAt: 'desc' },
      include: {
        _count: {
          select: { posts: true },
        },
      },
    });
  }

  async findOne(id: string) {
    const source = await this.prisma.blogSource.findUnique({
      where: { id },
      include: {
        posts: {
          take: 10,
          orderBy: { originalPublishedAt: 'desc' },
          select: {
            id: true,
            title: true,
            originalPublishedAt: true,
            isDisplay: true,
          },
        },
        _count: {
          select: { posts: true },
        },
      },
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
          url: updateBlogSourceDto.url,
          id: { not: id },
        },
      });

      if (existingSource) {
        throw new ConflictException('Blog source with this URL already exists');
      }
    }

    return this.prisma.blogSource.update({
      where: { id },
      data: updateBlogSourceDto,
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
      where: { id },
      data: { isActive: false },
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
      lastFetchStatus: status,
      lastFetchError: error || null,
    };

    if (newPostsCount !== undefined) {
      updateData.totalPostsFetched = {
        increment: newPostsCount,
      };
    }

    return this.prisma.blogSource.update({
      where: { id },
      data: updateData,
    });
  }

  async findAllActive() {
    return this.prisma.blogSource.findMany({
      where: { isActive: true },
      orderBy: { lastFetchedAt: 'asc' },
    });
  }
}
