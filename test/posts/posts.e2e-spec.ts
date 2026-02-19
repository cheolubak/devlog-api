import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import { FeedType } from '../../src/database/generated/prisma';
import { PrismaService } from '../../src/database/prisma.service';
import { createDisplayPostData, createPostData } from '../fixtures/post.fixtures';
import { createTestApp } from '../helpers/test-app.helper';
import { cleanDatabase } from '../prisma-test.utils';

describe('Posts (e2e)', () => {
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
        name: 'RSS Blog',
        type: FeedType.RSS,
        url: 'https://blog.com/rss',
      },
    });

    youtubeSource = await prisma.blogSource.create({
      data: {
        blogUrl: 'https://youtube.com/@ch',
        name: 'YouTube Channel',
        type: FeedType.YOUTUBE,
        url: 'https://youtube.com/@ch',
      },
    });
  });

  describe('GET /posts', () => {
    it('should return only display posts', async () => {
      await prisma.posts.create({
        data: createDisplayPostData(rssSource.id, {
          sourceUrl: 'https://blog.com/displayed',
        }),
      });
      await prisma.posts.create({
        data: createPostData(rssSource.id, {
          isDisplay: false,
          sourceUrl: 'https://blog.com/hidden',
        }),
      });

      const { body } = await request(app.getHttpServer())
        .get('/posts')
        .expect(200);

      expect(body.data).toHaveLength(1);
      expect(body.pagination.total).toBe(1);
    });

    it('should exclude soft-deleted posts', async () => {
      const post = await prisma.posts.create({
        data: createDisplayPostData(rssSource.id, {
          sourceUrl: 'https://blog.com/deleted',
        }),
      });

      await prisma.postDeletionLog.create({
        data: { postId: post.id },
      });

      const { body } = await request(app.getHttpServer())
        .get('/posts')
        .expect(200);

      expect(body.data).toHaveLength(0);
    });

    it('should paginate results', async () => {
      for (let i = 0; i < 5; i++) {
        await prisma.posts.create({
          data: createDisplayPostData(rssSource.id, {
            originalPublishedAt: new Date(`2025-01-${15 - i}T10:00:00Z`),
            sourceUrl: `https://blog.com/page-${i}`,
          }),
        });
      }

      const { body } = await request(app.getHttpServer())
        .get('/posts?limit=2&offset=0')
        .expect(200);

      expect(body.data).toHaveLength(2);
      expect(body.pagination.total).toBe(5);
      expect(body.pagination.hasMore).toBe(true);
    });

    it('should filter by sourceId', async () => {
      await prisma.posts.create({
        data: createDisplayPostData(rssSource.id, {
          sourceUrl: 'https://blog.com/rss-post',
        }),
      });
      await prisma.posts.create({
        data: createDisplayPostData(youtubeSource.id, {
          sourceUrl: 'https://youtube.com/yt-post',
        }),
      });

      const { body } = await request(app.getHttpServer())
        .get(`/posts?sourceId=${rssSource.id}`)
        .expect(200);

      expect(body.data).toHaveLength(1);
    });

    it('should filter by tag', async () => {
      const post = await prisma.posts.create({
        data: createDisplayPostData(rssSource.id, {
          sourceUrl: 'https://blog.com/tagged',
        }),
      });

      const tag = await prisma.tags.create({
        data: { count: 1, name: 'javascript' },
      });

      await prisma.postTags.create({
        data: { postId: post.id, tagId: tag.id },
      });

      const { body } = await request(app.getHttpServer())
        .get('/posts?tag=javascript')
        .expect(200);

      expect(body.data).toHaveLength(1);
    });

    it('should filter by type', async () => {
      await prisma.posts.create({
        data: createDisplayPostData(rssSource.id, {
          sourceUrl: 'https://blog.com/rss-typed',
        }),
      });
      await prisma.posts.create({
        data: createDisplayPostData(youtubeSource.id, {
          sourceUrl: 'https://youtube.com/yt-typed',
        }),
      });

      const { body } = await request(app.getHttpServer())
        .get('/posts?type=YOUTUBE')
        .expect(200);

      expect(body.data).toHaveLength(1);
    });
  });

  describe('GET /posts/all', () => {
    it('should return all posts including non-display', async () => {
      await prisma.posts.create({
        data: createDisplayPostData(rssSource.id, {
          sourceUrl: 'https://blog.com/all-1',
        }),
      });
      await prisma.posts.create({
        data: createPostData(rssSource.id, {
          isDisplay: false,
          sourceUrl: 'https://blog.com/all-2',
        }),
      });

      const { body } = await request(app.getHttpServer())
        .get('/posts/all')
        .expect(200);

      expect(body.data).toHaveLength(2);
    });

    it('should filter by isDisplay', async () => {
      await prisma.posts.create({
        data: createDisplayPostData(rssSource.id, {
          sourceUrl: 'https://blog.com/disp-1',
        }),
      });
      await prisma.posts.create({
        data: createPostData(rssSource.id, {
          isDisplay: false,
          sourceUrl: 'https://blog.com/disp-2',
        }),
      });

      const { body } = await request(app.getHttpServer())
        .get('/posts/all?isDisplay=true')
        .expect(200);

      expect(body.data).toHaveLength(1);
      expect(body.data[0].isDisplay).toBe(true);
    });
  });

  describe('GET /posts/blog', () => {
    it('should return only blog type posts (RSS/ATOM/SCRAPING)', async () => {
      await prisma.posts.create({
        data: createDisplayPostData(rssSource.id, {
          sourceUrl: 'https://blog.com/blog-type',
        }),
      });
      await prisma.posts.create({
        data: createDisplayPostData(youtubeSource.id, {
          sourceUrl: 'https://youtube.com/yt-type',
        }),
      });

      const { body } = await request(app.getHttpServer())
        .get('/posts/blog')
        .expect(200);

      expect(body.data).toHaveLength(1);
    });
  });

  describe('GET /posts/youtube', () => {
    it('should return only YOUTUBE type posts', async () => {
      await prisma.posts.create({
        data: createDisplayPostData(rssSource.id, {
          sourceUrl: 'https://blog.com/not-yt',
        }),
      });
      await prisma.posts.create({
        data: createDisplayPostData(youtubeSource.id, {
          sourceUrl: 'https://youtube.com/is-yt',
        }),
      });

      const { body } = await request(app.getHttpServer())
        .get('/posts/youtube')
        .expect(200);

      expect(body.data).toHaveLength(1);
    });
  });

  describe('GET /posts/:id', () => {
    it('should return a single post with source and tags', async () => {
      const post = await prisma.posts.create({
        data: createDisplayPostData(rssSource.id, {
          sourceUrl: 'https://blog.com/single',
        }),
      });

      const tag = await prisma.tags.create({
        data: { count: 1, name: 'nestjs' },
      });

      await prisma.postTags.create({
        data: { postId: post.id, tagId: tag.id },
      });

      const { body } = await request(app.getHttpServer())
        .get(`/posts/${post.id}`)
        .expect(200);

      expect(body.id).toBe(post.id);
      expect(body.source).toBeDefined();
      expect(body.source.id).toBe(rssSource.id);
      expect(body.postTags).toHaveLength(1);
      expect(body.postTags[0].tag.name).toBe('nestjs');
    });

    it('should return 404 for non-existent post', async () => {
      await request(app.getHttpServer())
        .get('/posts/00000000-0000-0000-0000-000000000000')
        .expect(404);
    });
  });

  describe('PATCH /posts/:id/display', () => {
    it('should toggle isDisplay', async () => {
      const post = await prisma.posts.create({
        data: createPostData(rssSource.id, {
          isDisplay: false,
          sourceUrl: 'https://blog.com/toggle',
        }),
      });

      const { body } = await request(app.getHttpServer())
        .patch(`/posts/${post.id}/display`)
        .send({ isDisplay: true })
        .expect(200);

      expect(body.isDisplay).toBe(true);

      const { body: body2 } = await request(app.getHttpServer())
        .patch(`/posts/${post.id}/display`)
        .send({ isDisplay: false })
        .expect(200);

      expect(body2.isDisplay).toBe(false);
    });

    it('should return 400 for invalid body', async () => {
      const post = await prisma.posts.create({
        data: createPostData(rssSource.id, {
          sourceUrl: 'https://blog.com/invalid-body',
        }),
      });

      await request(app.getHttpServer())
        .patch(`/posts/${post.id}/display`)
        .send({ isDisplay: 'not-a-boolean' })
        .expect(400);
    });

    it('should return 404 for non-existent post', async () => {
      await request(app.getHttpServer())
        .patch('/posts/00000000-0000-0000-0000-000000000000/display')
        .send({ isDisplay: true })
        .expect(404);
    });
  });

  describe('DELETE /posts/:id', () => {
    it('should soft delete by creating PostDeletionLog', async () => {
      const post = await prisma.posts.create({
        data: createPostData(rssSource.id, {
          sourceUrl: 'https://blog.com/to-delete',
        }),
      });

      await request(app.getHttpServer())
        .delete(`/posts/${post.id}`)
        .expect(200);

      const log = await prisma.postDeletionLog.findUnique({
        where: { postId: post.id },
      });
      expect(log).toBeDefined();
      expect(log.postId).toBe(post.id);
    });

    it('should return 400 for already deleted post', async () => {
      const post = await prisma.posts.create({
        data: createPostData(rssSource.id, {
          sourceUrl: 'https://blog.com/already-deleted',
        }),
      });

      await request(app.getHttpServer())
        .delete(`/posts/${post.id}`)
        .expect(200);

      await request(app.getHttpServer())
        .delete(`/posts/${post.id}`)
        .expect(400);
    });

    it('should return 404 for non-existent post', async () => {
      await request(app.getHttpServer())
        .delete('/posts/00000000-0000-0000-0000-000000000000')
        .expect(404);
    });
  });
});
