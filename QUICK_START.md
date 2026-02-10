# Quick Start Guide - RSS Feed Collection

## Prerequisites

1. Fix database connection (Supabase credentials in `.env`)
2. Run migration: `npx prisma migrate dev --name add_blog_fetching_feature`

## Start Application

```bash
pnpm run start:dev
```

## Quick Test (Copy & Paste)

### 1. Add Dev.to as a source

```bash
curl -X POST http://localhost:3000/blog-sources \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Dev.to",
    "url": "https://dev.to/feed",
    "type": "RSS"
  }'
```

**Save the `id` from the response as SOURCE_ID**

### 2. Fetch posts from the source

```bash
# Replace with your actual source ID
curl -X POST http://localhost:3000/feed-fetcher/fetch/YOUR_SOURCE_ID_HERE
```

### 3. View collected posts

```bash
curl http://localhost:3000/posts
```

### 4. Get posts by source

```bash
curl http://localhost:3000/posts?sourceId=YOUR_SOURCE_ID_HERE
```

### 5. Display a post

```bash
# Replace with an actual post ID from step 3
curl -X PATCH http://localhost:3000/posts/YOUR_POST_ID_HERE/display \
  -H "Content-Type: application/json" \
  -d '{"isDisplay": true}'
```

### 6. View only displayed posts

```bash
curl http://localhost:3000/posts?isDisplay=true
```

## Automatic Scheduling

The scheduler runs every hour automatically. Check logs for:
```
[FeedSchedulerService] Starting scheduled feed fetch
```

To disable: Comment out `@Cron` decorator in `src/feed-fetcher/feed-scheduler.service.ts`

## Common API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/blog-sources` | Add new RSS feed |
| GET | `/blog-sources` | List all sources |
| GET | `/blog-sources/:id` | Get source details |
| PATCH | `/blog-sources/:id` | Update source |
| DELETE | `/blog-sources/:id` | Deactivate source |
| POST | `/feed-fetcher/fetch/:sourceId` | Fetch from one source |
| POST | `/feed-fetcher/fetch-all` | Fetch from all sources |
| GET | `/posts` | List posts (with filters) |
| GET | `/posts/:id` | Get post details |
| PATCH | `/posts/:id/display` | Update display status |

## Query Parameters for `/posts`

- `?sourceId=uuid` - Filter by source
- `?isDisplay=true/false` - Filter by display status
- `?tag=javascript` - Filter by tag
- `?limit=20` - Results per page (default: 20)
- `?offset=0` - Skip results (default: 0)

## Recommended Test RSS Feeds

- **Dev.to**: `https://dev.to/feed`
- **Medium Tech**: `https://medium.com/feed/tag/technology`
- **Hashnode**: `https://hashnode.com/rss/engineering`
- **GitHub Blog**: `https://github.blog/feed/`
- **CSS-Tricks**: `https://css-tricks.com/feed/`

## Database Check

```bash
# Open Prisma Studio
npx prisma studio
```

Or use SQL:
```sql
SELECT * FROM "BlogSource";
SELECT * FROM "Posts" ORDER BY "originalPublishedAt" DESC LIMIT 10;
SELECT * FROM "Tags" ORDER BY count DESC LIMIT 10;
```

## Troubleshooting

**Problem**: Database migration fails
**Solution**: Check Supabase credentials in `.env`, ensure project is active

**Problem**: RSS feed returns error
**Solution**: Check URL is valid RSS/Atom feed, try in browser first

**Problem**: Duplicate posts
**Solution**: System automatically prevents duplicates by URL

**Problem**: Scheduler not running
**Solution**: Check logs, ensure app stays running, verify system time

## Key Features

✅ Automatic deduplication by URL
✅ Tag extraction from RSS categories
✅ Content hash for change detection
✅ Image extraction from content
✅ Error handling per source
✅ Hourly automatic fetch
✅ Manual fetch on demand
