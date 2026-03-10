import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';

import { Posts, Prisma, Users } from '../database/generated/prisma/client';
import { PrismaService } from '../database/prisma.service';
import { KeywordExtractorService } from '../feed-fetcher/keyword-extractor.service';
import { ImageParseService } from '../image-parse/image-parse.service';
import { processInChunks } from '../utils/chunk-parallel';
import { PostQueryDto } from './dto/post-query.dto';

@Injectable()
export class PostsService {
  private readonly logger = new Logger(PostsService.name);

  private readonly displayPostSelect = {
    description: true,
    descriptionEn: true,
    id: true,
    imageUrl: true,
    originalPublishedAt: true,
    source: {
      select: {
        blogUrl: true,
        icon: true,
        id: true,
        name: true,
        type: true,
        url: true,
      },
    },
    sourceUrl: true,
    title: true,
    titleEn: true,
    viewCount: true,
  } as const;

  constructor(
    private readonly prisma: PrismaService,
    private readonly keywordExtractorService: KeywordExtractorService,
    private readonly imageParseService: ImageParseService,
  ) {}

  private buildPagination({
    limit,
    offset,
    total,
  }: {
    limit: number;
    offset: number;
    total: number;
  }) {
    return {
      hasMore: offset * limit + limit < total,
      limit,
      offset,
      total,
    };
  }

  private async findPostsWithCount<T>({
    limit,
    offset,
    orderBy,
    select,
    where,
  }: {
    limit: number;
    offset: number;
    orderBy:
      | Prisma.PostsOrderByWithRelationInput
      | Prisma.PostsOrderByWithRelationInput[];
    select: T;
    where: Prisma.PostsWhereInput;
  }): Promise<[Posts[], number]> {
    return Promise.all([
      this.prisma.posts.findMany({
        orderBy: orderBy,
        relationLoadStrategy: 'join',
        select,
        skip: offset * limit,
        take: limit,
        where,
      }),
      this.prisma.posts.count({ where }),
    ]);
  }

  async findDisplayPosts({
    query,
    user,
  }: {
    query: PostQueryDto;
    user?: Users;
  }) {
    const { limit = 20, offset = 0, region, sourceId, tag, type } = query;

    this.logger.log('Finding display posts with query:', query);

    const where: Prisma.PostsWhereInput = {
      deletionLog: null,
    };

    if (sourceId) {
      where.sourceId = sourceId;
    }

    if (region || type) {
      where.source = {
        ...(region && { region }),
        ...(type && { type: { in: Array.isArray(type) ? type : [type] } }),
      };
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

    const [posts, total] = await this.findPostsWithCount({
      limit,
      offset,
      orderBy: { originalPublishedAt: 'desc' },
      select: this.displayPostSelect,
      where,
    });

    let bookmarkedPostIds: Set<string> = new Set();

    if (user) {
      const bookmarks = await this.prisma.postBookmarks.findMany({
        select: { postId: true },
        where: {
          postId: { in: posts.map((post) => post.id) },
          userId: user.id,
        },
      });
      bookmarkedPostIds = new Set(bookmarks.map((b) => b.postId));
    }

    return {
      data: posts.map((post) => ({
        ...post,
        isBookmark: bookmarkedPostIds.has(post.id),
      })),
      pagination: this.buildPagination({ limit, offset, total }),
    };
  }

  async findDisplayBookmarks({
    query,
    user,
  }: {
    query: PostQueryDto;
    user: Users;
  }) {
    const { ids, limit = 20, offset = 0, sourceId } = query;

    const where: Prisma.PostBookmarksWhereInput = {
      post: {
        deletionLog: null,
        isDisplay: true,
        ...(sourceId && { sourceId }),
        ...(ids && ids.length > 0 && { id: { in: ids } }),
      },
      userId: user.id,
    };

    const [bookmarks, total] = await Promise.all([
      this.prisma.postBookmarks.findMany({
        orderBy: { createdAt: 'desc' },
        select: {
          post: { select: this.displayPostSelect },
        },
        skip: offset * limit,
        take: limit,
        where,
      }),
      this.prisma.postBookmarks.count({ where }),
    ]);

    return {
      data: bookmarks.map((b) => ({
        ...b.post,
        isBookmark: true,
      })),
      pagination: this.buildPagination({ limit, offset, total }),
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

  async viewPost({
    id,
    sessionId,
    user,
  }: {
    id: string;
    sessionId: string;
    user?: Users;
  }) {
    const viewed = await this.prisma.postViewHistory.findFirst({
      where: {
        OR: [{ userId: user?.id }, { sessionId }],
        postId: id,
      },
    });

    const promises: Promise<any>[] = [
      this.prisma.postViewHistory.create({
        data: {
          postId: id,
          sessionId,
          userId: user?.id,
        },
      }),
    ];

    if (!viewed) {
      promises.push(
        this.prisma.posts.update({
          data: {
            viewCount: {
              increment: 1,
            },
          },
          where: { id },
        }),
      );
    }

    await Promise.all(promises);

    return { message: 'success' };
  }

  async bookmarkPost({ id, user }: { id: string; user: Users }) {
    const findBookmark = await this.prisma.postBookmarks.findUnique({
      where: {
        userId_postId: {
          postId: id,
          userId: user.id,
        },
      },
    });

    if (!findBookmark) {
      await this.prisma.postBookmarks.create({
        data: {
          postId: id,
          userId: user.id,
        },
      });
    } else {
      await this.prisma.postBookmarks.delete({
        where: {
          userId_postId: {
            postId: id,
            userId: user.id,
          },
        },
      });
    }

    return { message: 'success' };
  }

  async updateThumbnail(id: string, imageUrl: string) {
    try {
      const url = await this.imageParseService.uploadImageAsWebp(
        imageUrl,
        `thumbnails/posts/${id}`,
      );

      const updated = await this.prisma.posts.update({
        data: {
          imageUrl: url.startsWith('/') ? url : `/${url}`,
        },
        where: { id },
      });

      this.logger.log(`Updated thumbnail for post ${id}: ${url}`);
      return updated;
    } catch (e) {
      this.logger.error(
        `Failed to update thumbnail for post ${id} : ${e.message}`,
      );
      return null;
    }
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
        await this.keywordExtractorService
          .extractKeywords(post.title, post.sourceUrl)
          .then(async (keywords) => {
            if (keywords) {
              await this.prisma.postSearchKeywords.upsert({
                create: { keywords, postId: id },
                update: { keywords },
                where: { postId: id },
              });
              this.logger.log(`Keywords saved for post ${id}`);
            }
          })
          .catch((error) => {
            this.logger.error(
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

    const where: Prisma.PostsWhereInput = {
      deletionLog: null,
    };

    where.isDisplay = isDisplay;

    if (type) {
      where.source = { type: { in: Array.isArray(type) ? type : [type] } };
    }

    const [posts, total] = await this.findPostsWithCount({
      limit,
      offset,
      orderBy: { originalPublishedAt: 'desc' },
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
      where,
    });

    return {
      data: posts,
      pagination: this.buildPagination({ limit, offset, total }),
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

  async updatePostsWithExternalImages() {
    this.logger.log(
      'Finding posts with external images (https and not /thumbnails/posts)',
    );

    const posts = await this.prisma.posts.findMany({
      orderBy: { originalPublishedAt: 'desc' },
      relationLoadStrategy: 'join',
      select: {
        id: true,
        imageUrl: true,
        originalPublishedAt: true,
        source: {
          select: {
            blogUrl: true,
          },
        },
        sourceUrl: true,
        title: true,
      },
      where: {
        imageUrl: {
          not: {
            startsWith: '/thumbnails/posts',
          },
          startsWith: 'https',
        },
        isDisplay: true,
      },
    });

    const results = await processInChunks(
      posts,
      async (post) => {
        const sourceUrl = post.source.blogUrl.split('/').at(0) ?? '';
        const imageUrl = post.imageUrl.startsWith('https')
          ? post.imageUrl
          : `${sourceUrl}${post.imageUrl.startsWith('/') ? post.imageUrl : `/${post.imageUrl}`}`;
        return this.updateThumbnail(post.id, imageUrl);
      },
      5,
    );

    const successCount = results.filter(Boolean).length;
    const failedCount = results.length - successCount;

    this.logger.log(
      `Updated thumbnails for ${successCount.toLocaleString()} posts, failed for ${failedCount.toLocaleString()} posts (total: ${posts.length.toLocaleString()})`,
    );

    return { failed: failedCount, success: successCount };
  }
}
