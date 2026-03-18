import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import {
  FeedType,
  RegionType,
} from '../../src/database/generated/prisma/client';
import { PrismaService } from '../../src/database/prisma.service';
import {
  createRssBlogSourceDto,
  createScrapingBlogSourceDto,
  createYoutubeBlogSourceDto,
} from '../fixtures/blog-source.fixtures';
import { createTestApp } from '../helpers/test-app.helper';
import { cleanDatabase } from '../prisma-test.utils';

describe('BlogSources (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

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
  });

  describe('POST /blog-sources', () => {
    it('should create an RSS blog source', async () => {
      const dto = createRssBlogSourceDto();

      const { body } = await request(app.getHttpServer())
        .post('/blog-sources')
        .send(dto)
        .expect(201);

      expect(body.id).toBeDefined();
      expect(body.name).toBe(dto.name);
      expect(body.url).toBe(dto.url);
      expect(body.type).toBe(FeedType.RSS);
      expect(body.isActive).toBe(true);
    });

    it('should create a YOUTUBE blog source', async () => {
      const dto = createYoutubeBlogSourceDto();

      const { body } = await request(app.getHttpServer())
        .post('/blog-sources')
        .send(dto)
        .expect(201);

      expect(body.type).toBe(FeedType.YOUTUBE);
    });

    it('should create a SCRAPING blog source with config', async () => {
      const dto = createScrapingBlogSourceDto();

      const { body } = await request(app.getHttpServer())
        .post('/blog-sources')
        .send(dto)
        .expect(201);

      expect(body.type).toBe(FeedType.SCRAPING);
      expect(body.scrapingConfig).toEqual(dto.scrapingConfig);
    });

    it('should return 409 for duplicate URL', async () => {
      const dto = createRssBlogSourceDto();
      await request(app.getHttpServer())
        .post('/blog-sources')
        .send(dto)
        .expect(201);

      await request(app.getHttpServer())
        .post('/blog-sources')
        .send(dto)
        .expect(409);
    });

    it('should return 400 when required fields are missing', async () => {
      await request(app.getHttpServer())
        .post('/blog-sources')
        .send({ name: 'Test' })
        .expect(400);
    });

    it('should return 400 for invalid enum type', async () => {
      await request(app.getHttpServer())
        .post('/blog-sources')
        .send({
          blogUrl: 'https://example.com',
          name: 'Test',
          type: 'INVALID_TYPE',
          url: 'https://example.com/feed',
        })
        .expect(400);
    });
  });

  describe('GET /blog-sources', () => {
    it('should return only active sources by default', async () => {
      await prisma.blogSource.createMany({
        data: [
          {
            blogUrl: 'https://a.com',
            isActive: true,
            name: 'Active',
            region: RegionType.KOREA,
            type: FeedType.RSS,
            url: 'https://a.com/rss',
          },
          {
            blogUrl: 'https://b.com',
            isActive: false,
            name: 'Inactive',
            region: RegionType.KOREA,
            type: FeedType.RSS,
            url: 'https://b.com/rss',
          },
        ],
      });

      const { body } = await request(app.getHttpServer())
        .get('/blog-sources')
        .expect(200);

      expect(body).toHaveLength(1);
      expect(body[0].name).toBe('Active');
    });

    it('should return all sources with includeInactive=true', async () => {
      await prisma.blogSource.createMany({
        data: [
          {
            blogUrl: 'https://a.com',
            isActive: true,
            name: 'Active',
            region: RegionType.KOREA,
            type: FeedType.RSS,
            url: 'https://a.com/rss',
          },
          {
            blogUrl: 'https://b.com',
            isActive: false,
            name: 'Inactive',
            region: RegionType.KOREA,
            type: FeedType.RSS,
            url: 'https://b.com/rss',
          },
        ],
      });

      const { body } = await request(app.getHttpServer())
        .get('/blog-sources?includeInactive=true')
        .expect(200);

      expect(body).toHaveLength(2);
    });

    it('should include _count.posts', async () => {
      const source = await prisma.blogSource.create({
        data: {
          blogUrl: 'https://a.com',
          name: 'Source',
          region: RegionType.KOREA,
          type: FeedType.RSS,
          url: 'https://a.com/rss',
        },
      });

      await prisma.posts.create({
        data: {
          sourceId: source.id,
          sourceUrl: 'https://a.com/post-1',
          title: 'Post 1',
        },
      });

      const { body } = await request(app.getHttpServer())
        .get('/blog-sources')
        .expect(200);

      expect(body[0]._count.posts).toBe(1);
    });
  });

  describe('GET /blog-sources/youtubes', () => {
    it('should return only YOUTUBE type sources', async () => {
      await prisma.blogSource.createMany({
        data: [
          {
            blogUrl: 'https://youtube.com/@ch1',
            name: 'YT Channel',
            region: RegionType.FOREIGN,
            type: FeedType.YOUTUBE,
            url: 'https://youtube.com/@ch1',
          },
          {
            blogUrl: 'https://blog.com',
            name: 'RSS Blog',
            region: RegionType.KOREA,
            type: FeedType.RSS,
            url: 'https://blog.com/rss',
          },
        ],
      });

      const { body } = await request(app.getHttpServer())
        .get('/blog-sources/youtubes')
        .expect(200);

      expect(body).toHaveLength(1);
      expect(body[0].type).toBe(FeedType.YOUTUBE);
    });
  });

  describe('GET /blog-sources/blogs', () => {
    it('should return only RSS/ATOM/SCRAPING type sources', async () => {
      await prisma.blogSource.createMany({
        data: [
          {
            blogUrl: 'https://rss.com',
            name: 'RSS',
            region: RegionType.KOREA,
            type: FeedType.RSS,
            url: 'https://rss.com/feed',
          },
          {
            blogUrl: 'https://atom.com',
            name: 'Atom',
            region: RegionType.KOREA,
            type: FeedType.ATOM,
            url: 'https://atom.com/feed',
          },
          {
            blogUrl: 'https://scrape.com',
            name: 'Scrape',
            region: RegionType.KOREA,
            scrapingConfig: {
              listSelector: '.item',
              renderMode: 'static',
              selectors: { link: 'a', title: '.t' },
            },
            type: FeedType.SCRAPING,
            url: 'https://scrape.com/posts',
          },
          {
            blogUrl: 'https://youtube.com/@ch',
            name: 'YouTube',
            region: RegionType.FOREIGN,
            type: FeedType.YOUTUBE,
            url: 'https://youtube.com/@ch',
          },
        ],
      });

      const { body } = await request(app.getHttpServer())
        .get('/blog-sources/blogs')
        .expect(200);

      expect(body).toHaveLength(3);
      body.forEach((source: any) => {
        expect([FeedType.RSS, FeedType.ATOM, FeedType.SCRAPING]).toContain(
          source.type,
        );
      });
    });
  });

  describe('GET /blog-sources/:id', () => {
    it('should return a source with recent posts', async () => {
      const source = await prisma.blogSource.create({
        data: {
          blogUrl: 'https://a.com',
          name: 'Source',
          region: RegionType.KOREA,
          type: FeedType.RSS,
          url: 'https://a.com/rss',
        },
      });

      await prisma.posts.create({
        data: {
          originalPublishedAt: new Date(),
          sourceId: source.id,
          sourceUrl: 'https://a.com/post-1',
          title: 'Recent Post',
        },
      });

      const { body } = await request(app.getHttpServer())
        .get(`/blog-sources/${source.id}`)
        .expect(200);

      expect(body.id).toBe(source.id);
      expect(body.posts).toHaveLength(1);
      expect(body.posts[0].title).toBe('Recent Post');
      expect(body._count.posts).toBe(1);
    });

    it('should return 404 for non-existent id', async () => {
      await request(app.getHttpServer())
        .get('/blog-sources/00000000-0000-0000-0000-000000000000')
        .expect(404);
    });
  });

  describe('PATCH /blog-sources/:id', () => {
    it('should update name and url', async () => {
      const source = await prisma.blogSource.create({
        data: {
          blogUrl: 'https://a.com',
          name: 'Old Name',
          region: RegionType.KOREA,
          type: FeedType.RSS,
          url: 'https://a.com/rss',
        },
      });

      const { body } = await request(app.getHttpServer())
        .patch(`/blog-sources/${source.id}`)
        .send({ name: 'New Name', url: 'https://a.com/new-rss' })
        .expect(200);

      expect(body.name).toBe('New Name');
      expect(body.url).toBe('https://a.com/new-rss');
    });

    it('should return 409 for duplicate url', async () => {
      await prisma.blogSource.create({
        data: {
          blogUrl: 'https://a.com',
          name: 'Source A',
          region: RegionType.KOREA,
          type: FeedType.RSS,
          url: 'https://a.com/rss',
        },
      });

      const sourceB = await prisma.blogSource.create({
        data: {
          blogUrl: 'https://b.com',
          name: 'Source B',
          region: RegionType.KOREA,
          type: FeedType.RSS,
          url: 'https://b.com/rss',
        },
      });

      await request(app.getHttpServer())
        .patch(`/blog-sources/${sourceB.id}`)
        .send({ url: 'https://a.com/rss' })
        .expect(409);
    });

    it('should return 404 for non-existent id', async () => {
      await request(app.getHttpServer())
        .patch('/blog-sources/00000000-0000-0000-0000-000000000000')
        .send({ name: 'New' })
        .expect(404);
    });
  });

  describe('DELETE /blog-sources/:id', () => {
    it('should soft delete (set isActive to false)', async () => {
      const source = await prisma.blogSource.create({
        data: {
          blogUrl: 'https://a.com',
          name: 'To Delete',
          region: RegionType.KOREA,
          type: FeedType.RSS,
          url: 'https://a.com/rss',
        },
      });

      const { body } = await request(app.getHttpServer())
        .delete(`/blog-sources/${source.id}`)
        .expect(200);

      expect(body.isActive).toBe(false);

      const updated = await prisma.blogSource.findUnique({
        where: { id: source.id },
      });
      expect(updated!.isActive).toBe(false);
    });

    it('should return 404 for non-existent id', async () => {
      await request(app.getHttpServer())
        .delete('/blog-sources/00000000-0000-0000-0000-000000000000')
        .expect(404);
    });
  });
});
