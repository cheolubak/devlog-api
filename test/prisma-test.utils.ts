import { PrismaService } from '../src/database/prisma.service';

export async function cleanDatabase(prisma: PrismaService): Promise<void> {
  await prisma.postDeletionLog.deleteMany();
  await prisma.postTags.deleteMany();
  await prisma.posts.deleteMany();
  await prisma.tags.deleteMany();
  await prisma.blogSource.deleteMany();
}
