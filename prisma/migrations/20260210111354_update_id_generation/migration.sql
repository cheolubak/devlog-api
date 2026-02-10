/*
  Warnings:

  - A unique constraint covering the columns `[sourceUrl]` on the table `Posts` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Tags` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "FeedType" AS ENUM ('RSS', 'ATOM');

-- CreateEnum
CREATE TYPE "FetchStatus" AS ENUM ('PENDING', 'SUCCESS', 'FAILED', 'PARTIAL');

-- AlterTable
ALTER TABLE "Posts" ADD COLUMN     "contentHash" VARCHAR(64),
ADD COLUMN     "description" TEXT,
ADD COLUMN     "imageUrl" VARCHAR(1000),
ADD COLUMN     "originalAuthor" VARCHAR(200),
ADD COLUMN     "originalPublishedAt" TIMESTAMP(3),
ADD COLUMN     "rawFeedData" JSONB,
ADD COLUMN     "sourceId" UUID,
ADD COLUMN     "sourceUrl" VARCHAR(1000),
ALTER COLUMN "title" SET DATA TYPE VARCHAR(500);

-- AlterTable
ALTER TABLE "Tags" ALTER COLUMN "name" SET DATA TYPE VARCHAR(50);

-- CreateTable
CREATE TABLE "BlogSource" (
    "id" UUID NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "url" VARCHAR(500) NOT NULL,
    "type" "FeedType" NOT NULL DEFAULT 'RSS',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "lastFetchedAt" TIMESTAMP(3),
    "lastFetchStatus" "FetchStatus" NOT NULL DEFAULT 'PENDING',
    "lastFetchError" TEXT,
    "totalPostsFetched" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BlogSource_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BlogSource_url_key" ON "BlogSource"("url");

-- CreateIndex
CREATE INDEX "BlogSource_isActive_idx" ON "BlogSource"("isActive");

-- CreateIndex
CREATE INDEX "BlogSource_lastFetchedAt_idx" ON "BlogSource"("lastFetchedAt");

-- CreateIndex
CREATE UNIQUE INDEX "Posts_sourceUrl_key" ON "Posts"("sourceUrl");

-- CreateIndex
CREATE INDEX "Posts_sourceId_idx" ON "Posts"("sourceId");

-- CreateIndex
CREATE INDEX "Posts_isDisplay_idx" ON "Posts"("isDisplay");

-- CreateIndex
CREATE INDEX "Posts_originalPublishedAt_idx" ON "Posts"("originalPublishedAt");

-- CreateIndex
CREATE UNIQUE INDEX "Tags_name_key" ON "Tags"("name");

-- CreateIndex
CREATE INDEX "Tags_name_idx" ON "Tags"("name");

-- AddForeignKey
ALTER TABLE "Posts" ADD CONSTRAINT "Posts_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "BlogSource"("id") ON DELETE SET NULL ON UPDATE CASCADE;
