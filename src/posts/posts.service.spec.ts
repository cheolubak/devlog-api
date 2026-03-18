import { BadRequestException, NotFoundException } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Test, TestingModule } from '@nestjs/testing';

import { PrismaService } from '../database/prisma.service';
import { ImageParseService } from '../image-parse/image-parse.service';
import { PostsService } from './posts.service';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mockPrisma: any = {
  $transaction: jest.fn((fn: (tx: typeof mockPrisma) => Promise<unknown>) =>
    fn(mockPrisma),
  ),
  postBookmarks: {
    create: jest.fn(),
    delete: jest.fn(),
    findUnique: jest.fn(),
  },
  postDeletionLog: {
    create: jest.fn(),
    findUnique: jest.fn(),
  },
  posts: {
    count: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
  },
  postSearchKeywords: {
    upsert: jest.fn(),
  },
  postTags: {
    deleteMany: jest.fn(),
  },
  tags: {
    update: jest.fn(),
  },
};

const mockImageParse = {
  uploadImageAsWebp: jest.fn(),
};

const mockEventEmitter = {
  emit: jest.fn(),
};

describe('PostsService', () => {
  let service: PostsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostsService,
        { provide: PrismaService, useValue: mockPrisma },
        { provide: ImageParseService, useValue: mockImageParse },
        { provide: EventEmitter2, useValue: mockEventEmitter },
      ],
    }).compile();

    service = module.get<PostsService>(PostsService);
    jest.clearAllMocks();
  });

  describe('findOne', () => {
    it('should return post when found', async () => {
      const mockPost = {
        id: 'post-1',
        postTags: [],
        source: {
          blogUrl: 'https://blog.example.com',
          icon: null,
          id: 'src-1',
          name: 'Test Blog',
          url: 'https://blog.example.com/feed',
        },
        title: 'Test Post',
      };

      mockPrisma.posts.findUnique.mockResolvedValue(mockPost);

      const result = await service.findOne('post-1');

      expect(result).toEqual(mockPost);
      expect(mockPrisma.posts.findUnique).toHaveBeenCalledWith({
        include: {
          postTags: {
            include: {
              tag: {
                select: { id: true, name: true },
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
        where: { deletionLog: null, id: 'post-1' },
      });
    });

    it('should throw NotFoundException when post not found', async () => {
      mockPrisma.posts.findUnique.mockResolvedValue(null);

      await expect(service.findOne('non-existent')).rejects.toThrow(
        NotFoundException,
      );
      await expect(service.findOne('non-existent')).rejects.toThrow(
        'Post not found',
      );
    });
  });

  describe('deletePost', () => {
    it('should throw NotFoundException when post not found', async () => {
      mockPrisma.posts.findUnique.mockResolvedValue(null);

      await expect(service.deletePost('non-existent')).rejects.toThrow(
        NotFoundException,
      );
      await expect(service.deletePost('non-existent')).rejects.toThrow(
        'Post not found',
      );
    });

    it('should throw BadRequestException when post already deleted', async () => {
      mockPrisma.posts.findUnique.mockResolvedValue({
        id: 'post-1',
        postTags: [],
        title: 'Test Post',
      });
      mockPrisma.postDeletionLog.findUnique.mockResolvedValue({
        id: 'log-1',
        postId: 'post-1',
      });

      await expect(service.deletePost('post-1')).rejects.toThrow(
        BadRequestException,
      );
      await expect(service.deletePost('post-1')).rejects.toThrow(
        'This post has already been deleted',
      );
    });

    it('should create deletion log when post exists and not deleted', async () => {
      mockPrisma.posts.findUnique.mockResolvedValue({
        id: 'post-1',
        postTags: [],
        title: 'Test Post',
      });
      mockPrisma.postDeletionLog.findUnique.mockResolvedValue(null);
      mockPrisma.postDeletionLog.create.mockResolvedValue({
        id: 'log-1',
        postId: 'post-1',
      });

      const result = await service.deletePost('post-1');

      expect(result).toEqual({ id: 'log-1', postId: 'post-1' });
      expect(mockPrisma.postDeletionLog.create).toHaveBeenCalledWith({
        data: { postId: 'post-1' },
      });
    });
  });

  describe('bookmarkPost', () => {
    const mockUser = { id: 'user-1' } as any;

    it('should create bookmark when not exists', async () => {
      mockPrisma.postBookmarks.findUnique.mockResolvedValue(null);
      mockPrisma.postBookmarks.create.mockResolvedValue({
        postId: 'post-1',
        userId: 'user-1',
      });

      const result = await service.bookmarkPost({
        id: 'post-1',
        user: mockUser,
      });

      expect(result).toEqual({ isBookmarked: true });
      expect(mockPrisma.postBookmarks.create).toHaveBeenCalledWith({
        data: { postId: 'post-1', userId: 'user-1' },
      });
      expect(mockPrisma.postBookmarks.delete).not.toHaveBeenCalled();
    });

    it('should delete bookmark when exists (toggle)', async () => {
      mockPrisma.postBookmarks.findUnique.mockResolvedValue({
        postId: 'post-1',
        userId: 'user-1',
      });
      mockPrisma.postBookmarks.delete.mockResolvedValue({
        postId: 'post-1',
        userId: 'user-1',
      });

      const result = await service.bookmarkPost({
        id: 'post-1',
        user: mockUser,
      });

      expect(result).toEqual({ isBookmarked: false });
      expect(mockPrisma.postBookmarks.delete).toHaveBeenCalledWith({
        where: {
          userId_postId: {
            postId: 'post-1',
            userId: 'user-1',
          },
        },
      });
      expect(mockPrisma.postBookmarks.create).not.toHaveBeenCalled();
    });
  });
});
