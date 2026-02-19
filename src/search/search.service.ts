import { Injectable, Logger } from '@nestjs/common';

import { FeedType } from '../database/generated/prisma';
import { PrismaService } from '../database/prisma.service';
import { SearchQueryDto } from './dto/search-query.dto';

@Injectable()
export class SearchService {
  private readonly logger = new Logger(SearchService.name);

  constructor(private readonly prisma: PrismaService) {}

  async search(query: SearchQueryDto) {
    const { limit = 20, offset = 0, q, type } = query;
    const skip = offset * limit;

    this.logger.log(`Searching for: "${q}" (limit=${limit}, offset=${offset})`);

    const pattern = `%${q.trim().split(/\s+/).join('%')}%`;

    const [posts, sources] = await Promise.all([
      this.searchPosts(pattern, type, limit, skip),
      this.searchSources(pattern, type, limit, skip),
    ]);

    return { posts, sources };
  }

  private async searchPosts(
    pattern: string,
    type: FeedType[],
    limit: number,
    skip: number,
  ) {
    const [data, totalResult] = await Promise.all([
      this.prisma.$queryRaw<
        {
          description: null | string;
          id: string;
          imageUrl: null | string;
          originalPublishedAt: Date | null;
          source: null | { blogUrl: string; id: string; name: string };
          sourceUrl: string;
          title: string;
        }[]
      >`
        SELECT p2.id,
               p2.title,
               p2.description,
               p2."imageUrl",
               p2."sourceUrl",
               p2."originalPublishedAt",
               json_build_object('id', s.id, 'name', s.name, 'blogUrl', s."blogUrl") AS source
        FROM "PostSearchKeywords" p
               LEFT JOIN "Posts" p2 ON p2.id = p."postId"
               LEFT JOIN "BlogSource" s ON s.id = p2."sourceId" AND s."type"::text = ANY (${type})
          LEFT JOIN "PostDeletionLog" pdl
        ON pdl."postId" = p2.id
        WHERE pdl."postId" IS NULL
          AND p2."isDisplay" = true
          AND (
          coalesce (p.keywords) || ' ' ||
          coalesce (p2.title
            , '') || ' ' ||
          coalesce (p2.description
            , '') || ' ' ||
          coalesce (p2.tags
            , '') || ' ' ||
          coalesce (s.name
            , '')
          )
          ILIKE ${pattern}
        ORDER BY p2."originalPublishedAt" DESC
          LIMIT ${limit}
        OFFSET ${skip}
      `,
      this.prisma.$queryRaw<{ count: bigint }[]>`
        SELECT COUNT(*) AS count
        FROM "PostSearchKeywords" p
          LEFT JOIN "Posts" p2
        ON p2.id = p."postId"
          LEFT JOIN "BlogSource" s
          ON s.id = p2."sourceId"
          LEFT JOIN "PostDeletionLog" pdl ON pdl."postId" = p2.id
        WHERE pdl."postId" IS NULL
          AND p2."isDisplay" = true
          AND (
          coalesce (p.keywords) || ' ' ||
          coalesce (p2.title
            , '') || ' ' ||
          coalesce (p2.description
            , '') || ' ' ||
          coalesce (p2.tags
            , '') || ' ' ||
          coalesce (s.name
            , '')
          ) ILIKE ${pattern}
      `,
    ]);

    return {
      data,
      total: Number(totalResult[0]?.count ?? 0),
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
