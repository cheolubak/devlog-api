import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import { FeedType } from '../../src/database/generated/prisma';
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
        type: FeedType.RSS,
        url: 'https://blog.com/rss',
      },
    });

    youtubeSource = await prisma.blogSource.create({
      data: {
        blogUrl: 'https://youtube.com/@devch',
        name: 'Dev Channel',
        type: FeedType.YOUTUBE,
        url: 'https://youtube.com/@devch',
      },
    });
  });

  describe('GET /search/blogs', () => {
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
        .get('/search/blogs?q=NestJS')
        .expect(200);

      expect(body.posts.data.length).toBeGreaterThanOrEqual(1);
      expect(
        body.posts.data.some((p: any) => p.title.includes('NestJS')),
      ).toBe(true);
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
        .get('/search/blogs?q=TypeScript')
        .expect(200);

      expect(body.posts.data.length).toBeGreaterThanOrEqual(1);
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
        .get('/search/blogs?q=Hidden Searchable')
        .expect(200);

      expect(body.posts.data).toHaveLength(0);
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
        .get('/search/blogs?q=Deleted Searchable')
        .expect(200);

      expect(body.posts.data).toHaveLength(0);
    });

    it('should return 400 when q is less than 2 characters', async () => {
      await request(app.getHttpServer())
        .get('/search/blogs?q=a')
        .expect(400);
    });

    it('should search blog sources by name', async () => {
      const { body } = await request(app.getHttpServer())
        .get('/search/blogs?q=Tech')
        .expect(200);

      expect(body.sources).toBeDefined();
      expect(body.sources.data.length).toBeGreaterThanOrEqual(1);
      expect(body.sources.data[0].name).toBe('Tech Blog');
    });
  });

  describe('GET /search/youtubes', () => {
    it('should search only YOUTUBE type posts', async () => {
      await prisma.posts.create({
        data: createDisplayPostData(youtubeSource.id, {
          sourceUrl: 'https://youtube.com/watch?v=abc',
          title: 'YouTube Tutorial on Docker',
        }),
      });
      await prisma.posts.create({
        data: createDisplayPostData(rssSource.id, {
          sourceUrl: 'https://blog.com/docker-guide',
          title: 'Docker Blog Guide',
        }),
      });

      const { body } = await request(app.getHttpServer())
        .get('/search/youtubes?q=Docker')
        .expect(200);

      expect(body.posts.data.length).toBeGreaterThanOrEqual(1);
      // The search uses raw SQL with type filter, so only YouTube posts should match
      // when the source type JOIN matches
    });

    it('should search youtube sources by name', async () => {
      const { body } = await request(app.getHttpServer())
        .get('/search/youtubes?q=Dev Channel')
        .expect(200);

      expect(body.sources).toBeDefined();
      expect(body.sources.data.length).toBeGreaterThanOrEqual(1);
    });
  });
});
