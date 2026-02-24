import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../database/prisma.service';
import { KeywordExtractorService } from '../feed-fetcher/keyword-extractor.service';
import { PostQueryDto } from './dto/post-query.dto';

@Injectable()
export class PostsService {
  private readonly logger = new Logger(PostsService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly keywordExtractorService: KeywordExtractorService,
  ) {}

  async findDisplayPosts(query: PostQueryDto) {
    const { limit = 20, offset = 0, sourceId, tag, type } = query;

    this.logger.log('Finding display posts with query:', query);

    const where: any = {
      deletionLog: null,
    };

    if (sourceId) {
      where.sourceId = sourceId;
    }

    if (type) {
      where.source = { type: { in: Array.isArray(type) ? type : [type] } };
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
          source: {
            select: {
              blogUrl: true,
              id: true,
              name: true,
              url: true,
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
    this.logger.log(`Finding post with id: ${id}`);

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
            blogUrl: true,
            icon: true,
            id: true,
            name: true,
            url: true,
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
    this.logger.log(`Updating display status for post ${id}: ${isDisplay}`);

    const post = await this.prisma.posts.findUnique({
      where: { id },
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    const updatedPost = await this.prisma.posts.update({
      data: { isDisplay },
      where: { id },
    });

    if (isDisplay) {
      const existingKeywords = await this.prisma.postSearchKeywords.findUnique({
        where: { postId: id },
      });

      if (!existingKeywords && post.sourceUrl) {
        this.keywordExtractorService
          .extractKeywords(post.title, post.sourceUrl)
          .then(async (keywords) => {
            if (keywords) {
              await this.prisma.postSearchKeywords.upsert({
                create: { keywords, postId: id },
                update: { keywords },
                where: { postId: id },
              });
              this.logger.debug(`Keywords saved for post ${id}`);
            }
          })
          .catch((error) => {
            this.logger.warn(
              `Keyword extraction failed for post ${id}: ${error.message}`,
            );
          });
      }
    }

    return updatedPost;
  }

  async findAll(query: PostQueryDto) {
    this.logger.log('Finding all posts with query:', query);

    const { isDisplay, limit = 20, offset = 0, type } = query;

    const where: any = {
      deletionLog: null,
    };

    where.isDisplay = isDisplay;

    if (type) {
      where.source = { type: { in: Array.isArray(type) ? type : [type] } };
    }

    const [posts, total] = await Promise.all([
      this.prisma.posts.findMany({
        orderBy: { originalPublishedAt: 'desc' },
        relationLoadStrategy: 'join',
        select: {
          description: true,
          id: true,
          imageUrl: true,
          isDisplay: true,
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
          searchKeywords: {
            select: {
              keywords: true,
            },
          },
          source: {
            select: {
              blogUrl: true,
              icon: true,
              id: true,
              name: true,
              url: true,
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
    this.logger.log(`Deleting post with id: ${id}`);

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

  async updateKeywords(id: string, keywords: string) {
    this.logger.log(`Updating keywords for post ${id}: ${keywords}`);

    const post = await this.prisma.posts.findUnique({
      where: { id },
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    return this.prisma.postSearchKeywords.upsert({
      create: { keywords, postId: id },
      update: { keywords },
      where: { postId: id },
    });
  }
}
