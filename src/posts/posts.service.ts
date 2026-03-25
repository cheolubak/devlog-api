import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { Posts, Prisma, Users } from '../database/generated/prisma/client';
import { PrismaService } from '../database/prisma.service';
import { ImageParseService } from '../image-parse/image-parse.service';
import { processInChunks } from '../utils/chunk-parallel';
import { POST_DISPLAY_UPDATED } from './constants/post-events';
import { PostQueryDto } from './dto/post-query.dto';
import { PostDisplayUpdatedEvent } from './events/post-display-updated.event';

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
    private readonly imageParseService: ImageParseService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  private buildPagination({
    limit,
    page,
    total,
  }: {
    limit: number;
    page: number;
    total: number;
  }) {
    return {
      hasMore: page * limit < total,
      limit,
      page,
      total,
    };
  }

  private async findPostsWithCount({
    limit,
    orderBy,
    page,
    select,
    where,
  }: {
    limit: number;
    orderBy:
      | Prisma.PostsOrderByWithRelationInput
      | Prisma.PostsOrderByWithRelationInput[];
    page: number;
    select: object;
    where: Prisma.PostsWhereInput;
  }) {
    return Promise.all([
      this.prisma.posts.findMany({
        orderBy: orderBy,
        relationLoadStrategy: 'join',
        select: select as any,
        skip: (page - 1) * limit,
        take: limit,
        where,
      }),
      this.prisma.posts.count({ where }),
    ]) as unknown as Promise<[Posts[], number]>;
  }

  async findDisplayPosts({
    query,
    user,
  }: {
    query: PostQueryDto;
    user?: Users;
  }) {
    const { limit = 20, page = 1, region, sourceId, tag, type } = query;

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
      orderBy: { originalPublishedAt: 'desc' },
      page,
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
      pagination: this.buildPagination({ limit, page, total }),
    };
  }

  async findDisplayBookmarks({
    query,
    user,
  }: {
    query: PostQueryDto;
    user: Users;
  }) {
    const { ids, limit = 20, page = 1, sourceId } = query;

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
        skip: (page - 1) * limit,
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
      pagination: this.buildPagination({ limit, page, total }),
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
            blogUrl: true,
            icon: true,
            id: true,
            name: true,
            url: true,
          },
        },
      },
      relationLoadStrategy: 'join',
      where: { deletionLog: null, id },
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
    const post = await this.prisma.posts.findUnique({
      select: { id: true },
      where: { deletionLog: null, id },
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    const viewed = await this.prisma.postViewHistory.findFirst({
      where: {
        postId: id,
        ...(user?.id
          ? { OR: [{ userId: user.id }, { sessionId }] }
          : { sessionId }),
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
      return { isBookmarked: true };
    } else {
      await this.prisma.postBookmarks.delete({
        where: {
          userId_postId: {
            postId: id,
            userId: user.id,
          },
        },
      });
      return { isBookmarked: false };
    }
  }

  async updateThumbnail(id: string, imageUrl: string) {
    const url = await this.imageParseService.uploadImageAsWebp(
      imageUrl,
      `thumbnails/posts/${id}`,
    );

    return this.prisma.posts.update({
      data: {
        imageUrl: url.startsWith('/') ? url : `/${url}`,
      },
      where: { id },
    });
  }

  async updateDisplay(id: string, isDisplay: boolean) {
    const post = await this.prisma.posts.findUnique({
      where: { id },
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    const updatedPost = await this.prisma.posts.update({
      data: { isDisplay },
      select: {
        description: true,
        descriptionEn: true,
        id: true,
        searchKeywords: {
          select: {
            keywords: true,
          },
        },
        source: {
          select: {
            region: true,
          },
        },
        title: true,
        titleEn: true,
      },
      where: { id },
    });

    if (
      isDisplay &&
      (!updatedPost.searchKeywords?.keywords || !updatedPost.titleEn)
    ) {
      this.eventEmitter.emit(
        POST_DISPLAY_UPDATED,
        new PostDisplayUpdatedEvent(
          id,
          updatedPost.title,
          updatedPost.description,
          updatedPost.titleEn,
          post.sourceUrl,
          updatedPost.source?.region ?? null,
        ),
      );
    }

    return updatedPost;
  }

  async findAll(query: PostQueryDto) {
    const { isDisplay, limit = 20, page = 1, type } = query;

    const where: Prisma.PostsWhereInput = {
      deletionLog: null,
    };

    where.isDisplay = isDisplay;

    if (type) {
      where.source = { type: { in: Array.isArray(type) ? type : [type] } };
    }

    const [posts, total] = await this.findPostsWithCount({
      limit,
      orderBy: { originalPublishedAt: 'desc' },
      page,
      select: {
        description: true,
        id: true,
        imageUrl: true,
        isDisplay: true,
        originalPublishedAt: true,
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
        titleEn: true,
      },
      where,
    });

    return {
      data: posts,
      pagination: this.buildPagination({ limit, page, total }),
    };
  }

  async deletePost(id: string) {
    const post = await this.prisma.posts.findUnique({
      include: {
        postTags: {
          select: { tagId: true },
        },
      },
      where: { deletionLog: null, id },
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
      throw new BadRequestException('This post has already been deleted');
    }

    return this.prisma.$transaction(async (tx) => {
      if (post.postTags.length > 0) {
        await Promise.all(
          post.postTags.map((postTag) =>
            tx.$executeRaw(
              Prisma.sql`UPDATE "Tags" SET count = GREATEST(count - 1, 0) WHERE id = ${postTag.tagId}`,
            ),
          ),
        );
      }

      return tx.postDeletionLog.create({
        data: { postId: id },
      });
    });
  }

  async updateKeywords(id: string, keywords: string) {
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
        const baseUrl = new URL(post.source!.blogUrl).origin;
        const imageUrl = post.imageUrl!.startsWith('https')
          ? post.imageUrl!
          : `${baseUrl}${post.imageUrl!.startsWith('/') ? post.imageUrl! : `/${post.imageUrl!}`}`;
        return this.updateThumbnail(post.id, imageUrl);
      },
      5,
    );

    const successCount = results.length;
    const failedCount = posts.length - successCount;

    this.logger.log(
      `Updated thumbnails for ${successCount.toLocaleString()} posts, failed for ${failedCount.toLocaleString()} posts (total: ${posts.length.toLocaleString()})`,
    );

    return { failed: failedCount, success: successCount };
  }
}
