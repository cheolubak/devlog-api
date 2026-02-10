# RSS Feed Collection Feature - Setup & Testing Guide

## Implementation Status

All modules have been successfully implemented:

- ✅ Dependencies installed
- ✅ Prisma schema updated
- ✅ BlogSourcesModule created
- ✅ FeedFetcherModule created
- ✅ PostsModule created
- ✅ AppModule and main.ts updated
- ✅ Code compiles successfully

## Database Migration Required

**Important:** The database migration could not be completed due to a Supabase connection issue:
```
Error: FATAL: Tenant or user not found
```

### To Complete Setup:

1. **Verify Supabase credentials** in `.env` file
2. **Run the migration manually**:
   ```bash
   npx prisma migrate dev --name add_blog_fetching_feature
   ```
3. **Or use Prisma Studio to check connection**:
   ```bash
   npx prisma studio
   ```

## Project Structure

```
src/
├── blog-sources/
│   ├── dto/
│   │   ├── create-blog-source.dto.ts
│   │   └── update-blog-source.dto.ts
│   ├── blog-sources.controller.ts
│   ├── blog-sources.service.ts
│   └── blog-sources.module.ts
├── feed-fetcher/
│   ├── interfaces/
│   │   └── feed-item.interface.ts
│   ├── utils/
│   │   ├── content-hash.util.ts
│   │   └── feed-normalizer.util.ts
│   ├── feed-fetcher.controller.ts
│   ├── feed-fetcher.service.ts
│   ├── feed-parser.service.ts
│   ├── feed-scheduler.service.ts
│   └── feed-fetcher.module.ts
└── posts/
    ├── dto/
    │   ├── post-query.dto.ts
    │   └── update-display.dto.ts
    ├── posts.controller.ts
    ├── posts.service.ts
    └── posts.module.ts
```

## API Endpoints

### Blog Sources Management

**Create a new blog source**
```bash
curl -X POST http://localhost:3000/blog-sources \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Dev.to",
    "url": "https://dev.to/feed",
    "type": "RSS"
  }'
```

**Get all blog sources**
```bash
curl http://localhost:3000/blog-sources

# Include inactive sources
curl http://localhost:3000/blog-sources?includeInactive=true
```

**Get a specific blog source**
```bash
curl http://localhost:3000/blog-sources/{sourceId}
```

**Update a blog source**
```bash
curl -X PATCH http://localhost:3000/blog-sources/{sourceId} \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Name",
    "isActive": true
  }'
```

**Delete (deactivate) a blog source**
```bash
curl -X DELETE http://localhost:3000/blog-sources/{sourceId}
```

### Feed Fetching

**Manually fetch from a specific source**
```bash
curl -X POST http://localhost:3000/feed-fetcher/fetch/{sourceId}
```

**Manually fetch from all active sources**
```bash
curl -X POST http://localhost:3000/feed-fetcher/fetch-all
```

### Posts Management

**Get all posts with filtering**
```bash
# Basic list
curl http://localhost:3000/posts

# Filter by source
curl http://localhost:3000/posts?sourceId={sourceId}

# Filter by display status
curl http://localhost:3000/posts?isDisplay=true

# Filter by tag
curl http://localhost:3000/posts?tag=javascript

# Pagination
curl http://localhost:3000/posts?limit=10&offset=0

# Combined filters
curl http://localhost:3000/posts?sourceId={sourceId}&isDisplay=false&limit=20
```

**Get a specific post**
```bash
curl http://localhost:3000/posts/{postId}
```

**Update post display status**
```bash
curl -X PATCH http://localhost:3000/posts/{postId}/display \
  -H "Content-Type: application/json" \
  -d '{
    "isDisplay": true
  }'
```

## Testing Workflow

### 1. Start the Application

```bash
pnpm run start:dev
```

### 2. Add Test Blog Sources

Try these popular RSS feeds:

**Dev.to**
```bash
curl -X POST http://localhost:3000/blog-sources \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Dev.to",
    "url": "https://dev.to/feed",
    "type": "RSS"
  }'
```

**Medium (replace with actual username)**
```bash
curl -X POST http://localhost:3000/blog-sources \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Medium Tech",
    "url": "https://medium.com/feed/tag/technology",
    "type": "RSS"
  }'
```

**Hashnode**
```bash
curl -X POST http://localhost:3000/blog-sources \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Hashnode",
    "url": "https://hashnode.com/rss/engineering",
    "type": "RSS"
  }'
```

### 3. Trigger Manual Fetch

After adding sources, get the sourceId from the response and trigger a fetch:

```bash
# Save the sourceId from the previous response
SOURCE_ID="your-source-id-here"

# Trigger fetch
curl -X POST http://localhost:3000/feed-fetcher/fetch/$SOURCE_ID
```

Or fetch from all sources:
```bash
curl -X POST http://localhost:3000/feed-fetcher/fetch-all
```

### 4. Verify Posts Were Created

```bash
# Get all posts
curl http://localhost:3000/posts

# Check specific source's posts
curl http://localhost:3000/posts?sourceId=$SOURCE_ID
```

### 5. Test Display Management

```bash
# Get a post ID from the previous response
POST_ID="your-post-id-here"

# Enable display
curl -X PATCH http://localhost:3000/posts/$POST_ID/display \
  -H "Content-Type: application/json" \
  -d '{"isDisplay": true}'

# Verify only displayed posts
curl http://localhost:3000/posts?isDisplay=true
```

## Features Implemented

### Deduplication
- Posts with the same `sourceUrl` are automatically skipped
- Content hash is generated for future update detection

### Tag Management
- RSS categories are automatically converted to tags
- Tags are normalized (lowercase, special chars removed)
- Tag counts are automatically maintained
- Maximum 10 tags per post

### Error Handling
- Invalid RSS feeds are caught and logged
- Failed sources are marked with status FAILED
- Partial failures are marked as PARTIAL
- Individual item failures don't stop batch processing

### Automatic Scheduling
- Cron job runs every hour automatically
- Fetches all active sources
- Can be disabled by commenting out the `@Cron` decorator in `feed-scheduler.service.ts`

### Data Enrichment
- Original publish date preserved
- Author information captured
- First image extracted from content
- Description/snippet generated
- Raw feed data stored for debugging

## Database Schema Changes

### New Models

**BlogSource**
- Stores RSS feed URLs and metadata
- Tracks fetch status and history
- Can be activated/deactivated

**Enums**
- `FeedType`: RSS, ATOM
- `FetchStatus`: PENDING, SUCCESS, FAILED, PARTIAL

### Extended Models

**Posts**
- `sourceId`: Foreign key to BlogSource
- `sourceUrl`: Original URL (unique)
- `originalPublishedAt`: Original publish date
- `originalAuthor`: Original author
- `description`: Content snippet
- `imageUrl`: Featured image
- `rawFeedData`: Complete feed item (JSON)
- `contentHash`: SHA-256 hash for change detection
- `title`: Increased from 20 to 500 chars

**Tags**
- `name`: Now unique and increased to 50 chars
- Indexed for performance

## Troubleshooting

### Database Connection Issues

If you see "Tenant or user not found":
1. Check `.env` file has correct credentials
2. Verify Supabase project is active
3. Try using `DIRECT_URL` for migrations
4. Check if IP is whitelisted in Supabase

### RSS Feed Parsing Errors

If a feed fails to parse:
1. Check the URL is accessible
2. Verify it's a valid RSS/Atom feed
3. Check logs for specific error messages
4. Some feeds may have CORS or rate limiting

### Scheduler Not Running

If automatic fetching doesn't work:
1. Check logs for "Starting scheduled feed fetch"
2. Verify `ScheduleModule.forRoot()` is in AppModule
3. Check system time is correct
4. Ensure application stays running

## Monitoring

### Check Logs

The application logs important events:
- Feed parsing start/completion
- Number of items fetched
- Duplicate posts skipped
- Errors and failures
- Scheduler execution

### Query Database

```sql
-- Check source fetch status
SELECT name, last_fetched_at, last_fetch_status, total_posts_fetched
FROM "BlogSource"
ORDER BY last_fetched_at DESC;

-- Posts per source
SELECT bs.name, COUNT(p.id) as post_count
FROM "BlogSource" bs
LEFT JOIN "Posts" p ON p."sourceId" = bs.id
GROUP BY bs.id, bs.name;

-- Most common tags
SELECT name, count
FROM "Tags"
ORDER BY count DESC
LIMIT 20;
```

## Next Steps

1. **Complete database migration** - Fix Supabase connection and run migration
2. **Start the application** - `pnpm run start:dev`
3. **Add blog sources** - Use the API to add RSS feeds
4. **Trigger initial fetch** - Manually fetch to populate data
5. **Monitor logs** - Watch for scheduler execution
6. **Review posts** - Check collected posts and set display status

## Notes

- All collected posts default to `isDisplay=false`
- First RSS fetch may create many posts (up to feed limit)
- Scheduler runs hourly - disable in development if needed
- Content hash enables future content update detection
- Tag normalization helps with consistency
