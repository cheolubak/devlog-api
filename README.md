# devlog-api

RSS/Atom 피드, 웹 스크래핑, YouTube 채널에서 개발 블로그 포스트를 자동 수집하고 관리하는 NestJS 기반 API 서버입니다.

## 기술 스택

| 분류 | 기술 |
|------|------|
| Framework | NestJS v10, TypeScript |
| Database | PostgreSQL (Supabase) |
| ORM | Prisma |
| Auth | JWT, OAuth2 (Kakao, Naver, Google, GitHub) |
| AI | Anthropic Claude API (키워드 추출, 기술 블로그 판별) |
| Feed | rss-parser, Cheerio, Puppeteer |
| Image | Sharp (WebP 변환), Supabase Storage |
| Scheduler | @nestjs/schedule (Cron) |
| Observability | OpenTelemetry, Grafana |
| Messaging | Slack Web API |
| Package Manager | pnpm |

## 프로젝트 구조

```
src/
├── auth/              # OAuth2 소셜 로그인 및 JWT 인증
├── blog-sources/      # 블로그 소스 CRUD
├── posts/             # 포스트 조회, 북마크, 조회수 관리
├── feed-fetcher/      # RSS/Atom/스크래핑/YouTube 피드 수집
├── search/            # 포스트 전문 검색
├── request/           # 블로그/유튜브 추가 요청 (Slack 연동)
├── image-parse/       # 이미지 WebP 변환 및 Supabase 업로드
├── database/          # Prisma 서비스 및 생성된 클라이언트
├── telemetry/         # OpenTelemetry 트레이싱 및 로깅
└── utils/             # Slack, 로거, 병렬 처리 유틸리티
```

## 시작하기

### 사전 요구사항

- Node.js 20+
- pnpm
- PostgreSQL (또는 Supabase)

### 설치

```bash
pnpm install
```

### 환경 변수

`.env` 파일을 생성하고 다음 변수를 설정합니다.

```env
# Database
DATABASE_URL=                              # PostgreSQL 연결 URL (Prisma pooling)
DIRECT_URL=                                # PostgreSQL 직접 연결 URL

# Auth
JWT_SECRET=

# AI
ANTHROPIC_API_KEY=

# YouTube
YOUTUBE_API_KEY=

# Supabase Storage
SUPABASE_URL=
SUPABASE_ANON_KEY=
SUPABASE_STORAGE_BUCKET=

# Slack
SLACK_TOKEN=
SLACK_CHANNEL_ID=

# Observability
OTEL_EXPORTER_OTLP_ENDPOINT=
OTEL_EXPORTER_OTLP_HEADERS_Authorization=

# CORS
CORS_ORIGIN=                               # 쉼표 구분 허용 origin
```

### 실행

```bash
# 개발 서버
pnpm start:dev

# 프로덕션 빌드 및 실행
pnpm build
pnpm start:prod
```

## 주요 명령어

```bash
pnpm start:dev          # 개발 서버 (watch mode)
pnpm build              # Prisma 생성 + TypeScript 빌드
pnpm start:prod         # 프로덕션 실행
pnpm lint               # ESLint 검사 및 자동 수정
pnpm format             # Prettier 포맷팅
pnpm test               # 단위 테스트
pnpm test:e2e           # E2E 테스트 (Docker DB 자동 관리)
pnpm test:cov           # 커버리지 리포트
```

## API 엔드포인트

### Auth (`/auth`)

| Method | Path | Auth | 설명 |
|--------|------|------|------|
| POST | `/auth/kakao` | - | 카카오 소셜 로그인 |
| POST | `/auth/naver` | - | 네이버 소셜 로그인 |
| POST | `/auth/google` | - | 구글 소셜 로그인 |
| POST | `/auth/github` | - | GitHub 소셜 로그인 |
| POST | `/auth/refresh` | - | Access Token 갱신 |
| GET | `/auth/me` | Required | 내 프로필 조회 |
| DELETE | `/auth/leave` | Required | 회원 탈퇴 |

### Blog Sources (`/blog-sources`)

| Method | Path | 설명 |
|--------|------|------|
| POST | `/blog-sources` | 블로그 소스 생성 |
| GET | `/blog-sources` | 전체 조회 (`?includeInactive=true`) |
| GET | `/blog-sources/blogs` | RSS/ATOM/SCRAPING 소스만 조회 |
| GET | `/blog-sources/youtubes` | YouTube 소스만 조회 |
| GET | `/blog-sources/:id` | 단일 소스 + 최근 포스트 조회 |
| PATCH | `/blog-sources/:id` | 소스 수정 |
| PATCH | `/blog-sources/:id/image-update` | 아이콘 이미지 업로드 |
| DELETE | `/blog-sources/:id` | 소스 비활성화 (Soft Delete) |

### Posts (`/posts`)

| Method | Path | Auth | 설명 |
|--------|------|------|------|
| GET | `/posts` | Optional | 포스트 목록 (필터링, 북마크 여부 포함) |
| GET | `/posts/all` | - | 전체 포스트 (관리용) |
| GET | `/posts/bookmarks` | Required | 내 북마크 목록 |
| GET | `/posts/:id` | - | 포스트 상세 |
| PUT | `/posts/:id/view` | Optional | 조회수 기록 |
| PUT | `/posts/:id/keywords` | - | 검색 키워드 업데이트 |
| PUT | `/posts/:id/thumbnail` | - | 썸네일 업데이트 |
| POST | `/posts/:id/bookmarks` | Required | 북마크 토글 |
| PATCH | `/posts/:id/display` | - | 표시 여부 변경 |
| DELETE | `/posts/:id` | - | 포스트 삭제 (Soft Delete) |

### Feed Fetcher (`/feed-fetcher`)

| Method | Path | 설명 |
|--------|------|------|
| POST | `/feed-fetcher/fetch/:sourceId` | 특정 소스 피드 수집 |
| POST | `/feed-fetcher/fetch-all` | 전체 활성 소스 피드 수집 |

### Search (`/search`)

| Method | Path | Auth | 설명 |
|--------|------|------|------|
| GET | `/search` | - | 포스트 전문 검색 |
| GET | `/search/bookmarks` | Required | 북마크 내 검색 |

### Request (`/request`)

| Method | Path | Auth | 설명 |
|--------|------|------|------|
| POST | `/request/blogs` | Optional | 블로그 추가 요청 |
| POST | `/request/youtubes` | Optional | YouTube 추가 요청 |

## 데이터 모델

```
Users ──┬── PostBookmarks ──── Posts ──┬── PostTags ──── Tags
        │                              ├── PostSearchKeywords
        └── PostViewHistory            ├── PostDeletionLog
                                       └── BlogSource
```

- **Users**: 소셜 로그인 사용자 (Kakao, Naver, Google, GitHub)
- **BlogSource**: 피드 소스 (RSS, ATOM, SCRAPING, YOUTUBE)
- **Posts**: 수집된 포스트 (contentHash로 중복 방지)
- **Tags / PostTags**: 포스트 태그 (다대다 관계)
- **PostSearchKeywords**: AI 생성 검색 키워드
- **PostBookmarks**: 사용자 북마크
- **PostViewHistory**: 조회수 추적 (사용자/세션 기반 중복 방지)
- **PostDeletionLog**: Soft Delete 기록

## 주요 기능

### 피드 수집 (4가지 방식)
- **RSS/ATOM**: rss-parser를 통한 표준 피드 파싱
- **SCRAPING**: Cheerio(정적) 또는 Puppeteer(동적) HTML 스크래핑
- **YouTube**: YouTube Data API v3를 통한 채널 영상 수집 (Shorts 자동 필터링)

### AI 키워드 추출
- Anthropic Claude API를 활용하여 포스트에서 검색 키워드를 자동 추출
- 기술 블로그 여부를 AI로 판별하여 비기술 콘텐츠 필터링

### 이미지 처리
- 외부 이미지를 WebP 포맷으로 변환 (Sharp, 최대 1024px)
- Supabase Storage에 업로드하여 관리

### 스케줄러
- 매시간 Cron Job으로 모든 활성 소스에서 피드 자동 수집
- contentHash 기반 중복 포스트 방지

### 인증
- OAuth2 소셜 로그인 (Kakao, Naver, Google, GitHub)
- JWT Access Token (1시간) / Refresh Token (30일)
- 세션 기반 Refresh Token 검증

## 테스트

```bash
# E2E 테스트 (Docker PostgreSQL 자동 생성/제거)
pnpm test:e2e

# 단위 테스트
pnpm test
```

E2E 테스트는 Docker Compose로 테스트용 PostgreSQL 컨테이너를 자동으로 관리합니다.

```
test/
├── blog-sources/       # 블로그 소스 CRUD 테스트
├── posts/              # 포스트 조회 테스트
├── feed-fetcher/       # 피드 수집 테스트
├── search/             # 검색 테스트
├── fixtures/           # 테스트 데이터 팩토리
└── helpers/            # 테스트 유틸리티
```

## License

UNLICENSED
