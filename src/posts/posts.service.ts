import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../database/prisma.service';
import { PostQueryDto } from './dto/post-query.dto';

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}

  async findDisplayPosts(query: PostQueryDto) {
    const { limit = 20, offset = 0, sourceId, tag } = query;

    const where: any = {
      deletionLog: null,
    };

    if (sourceId) {
      where.sourceId = sourceId;
    }

    where.isDisplay = true;

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
        orderBy: { originalPublishedAt: 'desc' },
        relationLoadStrategy: 'join',
        select: {
          description: true,
          id: true,
          imageUrl: true,
          originalPublishedAt: true,
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
          source: {
            select: {
              id: true,
              name: true,
              url: true,
              blogUrl: true,
            },
          },
          sourceUrl: true,
          title: true,
        },
        skip: offset * limit,
        take: limit,
        where,
      }),
      this.prisma.posts.count({ where }),
    ]);

    return {
      data: posts,
      pagination: {
        hasMore: offset * limit + limit < total,
        limit,
        offset,
        total,
      },
    };
  }

  async findOne(id: string) {
    const post = await this.prisma.posts.findUnique({
      include: {
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
        source: {
          select: {
            id: true,
            name: true,
            url: true,
            icon: true,
            blogUrl: true,
          },
        },
      },
      relationLoadStrategy: 'join',
      where: { id },
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
      data: { isDisplay },
      where: { id },
    });
  }

  async findAll(query: PostQueryDto) {
    const { limit = 20, offset = 0, isDisplay } = query;

    const where: any = {
      deletionLog: null,
    };

    where.isDisplay = isDisplay;

    const [posts, total] = await Promise.all([
      this.prisma.posts.findMany({
        orderBy: { originalPublishedAt: 'desc' },
        relationLoadStrategy: 'join',
        select: {
          description: true,
          id: true,
          imageUrl: true,
          originalPublishedAt: true,
          isDisplay: true,
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
          source: {
            select: {
              id: true,
              name: true,
              url: true,
              icon: true,
              blogUrl: true,
            },
          },
          sourceUrl: true,
          title: true,
        },
        skip: offset * limit,
        take: limit,
        where,
      }),
      this.prisma.posts.count({ where }),
    ]);

    return {
      data: posts,
      pagination: {
        hasMore: offset * limit + limit < total,
        limit,
        offset,
        total,
      },
    };
  }

  async deletePost(id: string) {
    const post = await this.prisma.posts.findUnique({
      where: { id },
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    const isDelete = await this.prisma.postDeletionLog.findUnique({
      where: {
        postId: id,
      },
    });

    if (isDelete) {
      throw new BadRequestException();
    }

    return this.prisma.postDeletionLog.create({
      data: { postId: id },
    });
  }
}
