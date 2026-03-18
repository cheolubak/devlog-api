import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import { FeedType, RegionType } from '../../src/database/generated/prisma';
import { PrismaService } from '../../src/database/prisma.service';
import { createDisplayPostData } from '../fixtures/post.fixtures';
import { createTestApp } from '../helpers/test-app.helper';
import { cleanDatabase } from '../prisma-test.utils';

describe('Search (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  let rssSource: any;
  let youtubeSource: any;

  beforeAll(async () => {
    const testApp = await createTestApp();
    app = testApp.app;
    prisma = testApp.prisma;
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(async () => {
    await cleanDatabase(prisma);

    rssSource = await prisma.blogSource.create({
      data: {
        blogUrl: 'https://blog.com',
        name: 'Tech Blog',
        region: RegionType.KOREA,
        type: FeedType.RSS,
        url: 'https://blog.com/rss',
      },
    });

    youtubeSource = await prisma.blogSource.create({
      data: {
        blogUrl: 'https://youtube.com/@devch',
        name: 'Dev Channel',
        region: RegionType.FOREIGN,
        type: FeedType.YOUTUBE,
        url: 'https://youtube.com/@devch',
      },
    });
  });

  describe('GET /search', () => {
    it('should search posts by title', async () => {
      await prisma.posts.create({
        data: createDisplayPostData(rssSource.id, {
          sourceUrl: 'https://blog.com/nestjs-guide',
          title: 'NestJS Complete Guide',
        }),
      });
      await prisma.posts.create({
        data: createDisplayPostData(rssSource.id, {
          sourceUrl: 'https://blog.com/react-tips',
          title: 'React Tips and Tricks',
        }),
      });

      const { body } = await request(app.getHttpServer())
        .get('/search?q=NestJS')
        .expect(200);

      expect(body.data.length).toBeGreaterThanOrEqual(1);
      expect(body.data.some((p: any) => p.title.includes('NestJS'))).toBe(
        true,
      );
    });

    it('should search posts by description', async () => {
      await prisma.posts.create({
        data: createDisplayPostData(rssSource.id, {
          description: 'Learn about TypeScript generics in depth',
          sourceUrl: 'https://blog.com/ts-generics',
          title: 'Advanced Coding',
        }),
      });

      const { body } = await request(app.getHttpServer())
        .get('/search?q=TypeScript')
        .expect(200);

      expect(body.data.length).toBeGreaterThanOrEqual(1);
    });

    it('should only return display posts', async () => {
      await prisma.posts.create({
        data: {
          ...createDisplayPostData(rssSource.id, {
            sourceUrl: 'https://blog.com/hidden-search',
            title: 'Hidden Searchable Post',
          }),
          isDisplay: false,
        },
      });

      const { body } = await request(app.getHttpServer())
        .get('/search?q=Hidden Searchable')
        .expect(200);

      expect(body.data).toHaveLength(0);
    });

    it('should exclude soft-deleted posts', async () => {
      const post = await prisma.posts.create({
        data: createDisplayPostData(rssSource.id, {
          sourceUrl: 'https://blog.com/deleted-search',
          title: 'Deleted Searchable Post',
        }),
      });

      await prisma.postDeletionLog.create({
        data: { postId: post.id },
      });

      const { body } = await request(app.getHttpServer())
        .get('/search?q=Deleted Searchable')
        .expect(200);

      expect(body.data).toHaveLength(0);
    });

    it('should return 400 when q is less than 2 characters', async () => {
      await request(app.getHttpServer()).get('/search?q=a').expect(400);
    });
  });
});
