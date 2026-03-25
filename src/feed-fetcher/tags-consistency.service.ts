import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

import { PrismaService } from '../database/prisma.service';

@Injectable()
export class TagsConsistencyService {
  private readonly logger = new Logger(TagsConsistencyService.name);

  constructor(private readonly prisma: PrismaService) {}

  @Cron(CronExpression.EVERY_WEEK)
  async reconcileTagCounts() {
    this.logger.log('Starting weekly tag count reconciliation');

    try {
      const result = await this.prisma.$executeRaw`
        UPDATE "Tags" t
        SET count = (
          SELECT COUNT(*)::int
          FROM "PostTags" pt
            INNER JOIN "Posts" p ON p.id = pt."postId"
            LEFT JOIN "PostDeletionLog" pdl ON pdl."postId" = p.id
          WHERE pt."tagId" = t.id
            AND pdl."postId" IS NULL
        )
      `;

      this.logger.log(
        `Tag count reconciliation completed: ${result} tags updated`,
      );

      const deleted = await this.prisma.tags.deleteMany({
        where: {
          count: 0,
          postTags: { none: {} },
        },
      });

      if (deleted.count > 0) {
        this.logger.log(`Removed ${deleted.count} orphan tags with zero posts`);
      }
    } catch (error: unknown) {
      this.logger.error(
        `Tag count reconciliation failed: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  }
}
