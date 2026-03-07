import { Injectable, Logger } from '@nestjs/common';

import { FeedType, Prisma, Users } from '../database/generated/prisma';
import { PrismaService } from '../database/prisma.service';
import { SearchQueryDto } from './dto/search-query.dto';

@Injectable()
export class SearchService {
  private readonly logger = new Logger(SearchService.name);

  constructor(private readonly prisma: PrismaService) {}

  async search(query: SearchQueryDto) {
    const { limit = 20, offset = 0, q, sourceId } = query;
    const skip = offset * limit;

    this.logger.log(
      `Searching for: "${q}" (limit=${limit}, offset=${offset}), sourceId=${sourceId}`,
    );

    const pattern = `%${q.trim().split(/\s+/).join('%')}%`;

    return await this.searchPostsInternal({
      limit,
      offset,
      pattern,
      skip,
      sourceId,
    });
  }

  async searchBookmarks({
    query,
    user,
  }: {
    query: SearchQueryDto;
    user: Users;
  }) {
    const { limit = 20, offset = 0, q } = query;
    const skip = offset * limit;

    this.logger.log(
      `Searching Bookmarks for: "${q}" (limit=${limit}, offset=${offset})`,
    );

    const pattern = `%${q.trim().split(/\s+/).join('%')}%`;

    return await this.searchPostsInternal({
      limit,
      offset,
      pattern,
      skip,
      userId: user.id,
    });
  }

  private async searchPostsInternal({
    limit,
    offset,
    pattern,
    skip,
    sourceId,
    userId,
  }: {
    limit: number;
    offset: number;
    pattern: string;
    skip: number;
    sourceId?: string;
    userId?: string;
  }) {
    const bookmarkJoin = userId
      ? Prisma.sql`INNER JOIN "post_bookmarks" pb ON pb."post_id" = p2.id AND pb."user_id" = ${userId}::uuid`
      : Prisma.empty;

    const sourceWhere = sourceId
      ? Prisma.sql`AND p2."sourceId" = ${sourceId}::uuid`
      : Prisma.empty;

    const [matchedIds, totalResult] = await Promise.all([
      this.prisma.$queryRaw<{ id: string }[]>`
        SELECT p2.id
        FROM "Posts" p2
               ${bookmarkJoin}
               LEFT JOIN "PostSearchKeywords" p ON p2.id = p."postId"
               LEFT JOIN "BlogSource" s ON s.id = p2."sourceId"
               LEFT JOIN "PostDeletionLog" pdl ON pdl."postId" = p2.id
        WHERE pdl."postId" IS NULL
          AND p2."isDisplay" = true
          ${sourceWhere}
          AND (
          coalesce (p.keywords, '') || ' ' ||
          coalesce (p2.title, '') || ' ' ||
          coalesce (p2.description, '') || ' ' ||
          coalesce (p2.tags, '') || ' ' ||
          coalesce (s.name, '')
          )
          ILIKE ${pattern}
        ORDER BY p2."originalPublishedAt" DESC
          LIMIT ${limit}
        OFFSET ${skip}
      `,
      this.prisma.$queryRaw<{ count: bigint }[]>`
        SELECT COUNT(*) AS count
        FROM "Posts" p2
          ${bookmarkJoin}
          LEFT JOIN "PostSearchKeywords" p ON p2.id = p."postId"
          LEFT JOIN "BlogSource" s ON s.id = p2."sourceId"
          LEFT JOIN "PostDeletionLog" pdl ON pdl."postId" = p2.id
        WHERE pdl."postId" IS NULL
          AND p2."isDisplay" = true
          AND (
          coalesce (p.keywords, '') || ' ' ||
          coalesce (p2.title, '') || ' ' ||
          coalesce (p2.description, '') || ' ' ||
          coalesce (p2.tags, '') || ' ' ||
          coalesce (s.name, '')
          ) ILIKE ${pattern}
      `,
    ]);

    const total = Number(totalResult[0]?.count ?? 0);
    const ids = matchedIds.map((r) => r.id);

    const data =
      ids.length > 0
        ? await this.prisma.posts.findMany({
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
                  type: true,
                  url: true,
                },
              },
              sourceUrl: true,
              title: true,
            },
            where: { id: { in: ids } },
          })
        : [];

    return {
      data,
      pagination: {
        hasMore: skip + limit < total,
        limit,
        offset,
        total,
      },
    };
  }

  private async searchSources(
    pattern: string,
    type: FeedType[],
    limit: number,
    skip: number,
  ) {
    const [data, totalResult] = await Promise.all([
      this.prisma.$queryRaw<
        {
          blogUrl: string;
          icon: null | string;
          id: string;
          name: string;
          type: string;
          url: string;
        }[]
      >`
        SELECT id, name, url, "blogUrl", type, icon
        FROM "BlogSource"
        WHERE "isActive" = true
          AND name ILIKE ${pattern}
          AND type::text = ANY (${type})
        ORDER BY name ASC
          LIMIT ${limit}
        OFFSET ${skip}
      `,
      this.prisma.$queryRaw<{ count: bigint }[]>`
        SELECT COUNT(*) AS count
        FROM "BlogSource"
        WHERE "isActive" = true
          AND name ILIKE ${pattern}
      `,
    ]);

    return {
      data,
      total: Number(totalResult[0]?.count ?? 0),
    };
  }
}
