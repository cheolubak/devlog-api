-- Enable pg_trgm extension for trigram-based indexing
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- Add GIN trigram indexes for ILIKE search performance on Posts
CREATE INDEX IF NOT EXISTS "idx_posts_title_trgm" ON "Posts" USING gin ("title" gin_trgm_ops);
CREATE INDEX IF NOT EXISTS "idx_posts_description_trgm" ON "Posts" USING gin ("description" gin_trgm_ops);
CREATE INDEX IF NOT EXISTS "idx_posts_title_en_trgm" ON "Posts" USING gin ("title_en" gin_trgm_ops);
CREATE INDEX IF NOT EXISTS "idx_posts_description_en_trgm" ON "Posts" USING gin ("description_en" gin_trgm_ops);
CREATE INDEX IF NOT EXISTS "idx_posts_tags_trgm" ON "Posts" USING gin ("tags" gin_trgm_ops);

-- Add GIN trigram index for ILIKE search on PostSearchKeywords
CREATE INDEX IF NOT EXISTS "idx_post_search_keywords_trgm" ON "PostSearchKeywords" USING gin ("keywords" gin_trgm_ops);

-- Add GIN trigram index for ILIKE search on BlogSource
CREATE INDEX IF NOT EXISTS "idx_blog_source_name_trgm" ON "BlogSource" USING gin ("name" gin_trgm_ops);
