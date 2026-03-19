import { Injectable } from '@nestjs/common';

import {
  FeedType,
  Prisma,
  RegionType,
  Users,
} from '../database/generated/prisma/client';
import { PrismaService } from '../database/prisma.service';
import { SearchQueryDto } from './dto/search-query.dto';

@Injectable()
export class SearchService {
  constructor(private readonly prisma: PrismaService) {}

  private escapeLikePattern(input: string): string {
    return input.replace(/[\\%_]/g, '\\$&');
  }

  async search(query: SearchQueryDto) {
    const { limit = 20, offset = 0, q, region, sourceId, type } = query;
    const skip = offset * limit;

    const pattern = `%${q
      .trim()
      .split(/\s+/)
      .map((token) => this.escapeLikePattern(token))
      .join('%')}%`;

    return await this.searchPostsInternal({
      limit,
      offset,
      pattern,
      region,
      skip,
      sourceId,
      type,
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

    const pattern = `%${q
      .trim()
      .split(/\s+/)
      .map((token) => this.escapeLikePattern(token))
      .join('%')}%`;

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
    region,
    skip,
    sourceId,
    type,
    userId,
  }: {
    limit: number;
    offset: number;
    pattern: string;
    region?: RegionType;
    skip: number;
    sourceId?: string;
    type?: FeedType[];
    userId?: string;
  }) {
    const bookmarkJoin = userId
      ? Prisma.sql`INNER JOIN "post_bookmarks" pb ON pb."post_id" = p2.id AND pb."user_id" = ${userId}::uuid`
      : Prisma.empty;

    const sourceWhere = sourceId
      ? Prisma.sql`AND p2."sourceId" = ${sourceId}::uuid`
      : Prisma.empty;

    const typeWhere = type?.length
      ? Prisma.sql`AND s.type::text = ANY(${type})`
      : Prisma.empty;

    const regionWhere = region
      ? Prisma.sql`AND s.region::text = ${region}`
      : Prisma.empty;

    const [data, totalResult] = await Promise.all([
      this.prisma.$queryRaw<
        {
          description: null | string;
          description_en: null | string;
          id: string;
          imageUrl: null | string;
          originalPublishedAt: Date | null;
          sourceBlogUrl: string;
          sourceFeedUrl: string;
          sourceIcon: null | string;
          sourceId: string;
          sourceName: string;
          sourceType: string;
          sourceUrl: string;
          title: string;
          title_en: null | string;
          view_count: bigint;
        }[]
      >`
        SELECT p2.id,
               p2.title,
               p2.title_en,
               p2.description,
               p2.description_en,
               p2."imageUrl",
               p2."originalPublishedAt",
               p2."sourceUrl",
               p2."view_count",
               s.id        AS "sourceId",
               s.name      AS "sourceName",
               s.icon      AS "sourceIcon",
               s.url       AS "sourceFeedUrl",
               s."blogUrl" AS "sourceBlogUrl",
               s.type      AS "sourceType"
        FROM "Posts" p2 ${bookmarkJoin}
               LEFT JOIN "PostSearchKeywords" p
        ON p2.id = p."postId"
          LEFT JOIN "BlogSource" s ON s.id = p2."sourceId"
          LEFT JOIN "PostDeletionLog" pdl ON pdl."postId" = p2.id
        WHERE pdl."postId" IS NULL
          AND p2."isDisplay" = true ${sourceWhere} ${typeWhere} ${regionWhere}
          AND (
            p2.title ILIKE ${pattern} ESCAPE '\'
            OR p2.description ILIKE ${pattern} ESCAPE '\'
            OR p2.title_en ILIKE ${pattern} ESCAPE '\'
            OR p2.description_en ILIKE ${pattern} ESCAPE '\'
            OR p2.tags ILIKE ${pattern} ESCAPE '\'
            OR p.keywords ILIKE ${pattern} ESCAPE '\'
            OR s.name ILIKE ${pattern} ESCAPE '\'
          )
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
          ${sourceWhere} ${typeWhere} ${regionWhere}
          AND (
            p2.title ILIKE ${pattern} ESCAPE '\'
            OR p2.description ILIKE ${pattern} ESCAPE '\'
            OR p2.title_en ILIKE ${pattern} ESCAPE '\'
            OR p2.description_en ILIKE ${pattern} ESCAPE '\'
            OR p2.tags ILIKE ${pattern} ESCAPE '\'
            OR p.keywords ILIKE ${pattern} ESCAPE '\'
            OR s.name ILIKE ${pattern} ESCAPE '\'
          )
      `,
    ]);

    const total = Number(totalResult[0]?.count ?? 0);

    const formattedData = data.map((row) => ({
      description: row.description,
      descriptionEn: row.description_en,
      id: row.id,
      imageUrl: row.imageUrl,
      originalPublishedAt: row.originalPublishedAt,
      source: {
        blogUrl: row.sourceBlogUrl,
        icon: row.sourceIcon,
        id: row.sourceId,
        name: row.sourceName,
        type: row.sourceType,
        url: row.sourceFeedUrl,
      },
      sourceUrl: row.sourceUrl,
      title: row.title,
      titleEn: row.title_en,
      viewCount: Number(row.view_count),
    }));

    return {
      data: formattedData,
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
          AND name ILIKE ${pattern} ESCAPE '\'
          AND type::text = ANY (${type})
        ORDER BY name ASC
          LIMIT ${limit}
        OFFSET ${skip}
      `,
      this.prisma.$queryRaw<{ count: bigint }[]>`
        SELECT COUNT(*) AS count
        FROM "BlogSource"
        WHERE "isActive" = true
          AND name ILIKE ${pattern} ESCAPE '\'
      `,
    ]);

    return {
      data,
      total: Number(totalResult[0]?.count ?? 0),
    };
  }
}
