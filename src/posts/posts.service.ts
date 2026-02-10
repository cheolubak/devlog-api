import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { PostQueryDto } from './dto/post-query.dto';

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(query: PostQueryDto) {
    const { sourceId, isDisplay, tag, limit = 20, offset = 0 } = query;

    const where: any = {};

    if (sourceId) {
      where.sourceId = sourceId;
    }

    if (isDisplay !== undefined) {
      where.isDisplay = isDisplay;
    }

    if (tag) {
      where.postTags = {
        some: {
          tag: {
            name: tag,
          },
        },
      };
    }

    const [posts, total] = await Promise.all([
      this.prisma.posts.findMany({
        where,
        take: limit,
        skip: offset,
        orderBy: { originalPublishedAt: 'desc' },
        include: {
          source: {
            select: {
              id: true,
              name: true,
              url: true,
            },
          },
          postTags: {
            include: {
              tag: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
        },
      }),
      this.prisma.posts.count({ where }),
    ]);

    return {
      data: posts,
      pagination: {
        total,
        limit,
        offset,
        hasMore: offset + limit < total,
      },
    };
  }

  async findOne(id: string) {
    const post = await this.prisma.posts.findUnique({
      where: { id },
      include: {
        source: {
          select: {
            id: true,
            name: true,
            url: true,
          },
        },
        postTags: {
          include: {
            tag: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    return post;
  }

  async updateDisplay(id: string, isDisplay: boolean) {
    const post = await this.prisma.posts.findUnique({
      where: { id },
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    return this.prisma.posts.update({
      where: { id },
      data: { isDisplay },
    });
  }
}
