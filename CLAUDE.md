# devlog-api

RSS/Atom 피드를 수집하여 블로그 포스트를 관리하는 NestJS 기반 API 서버입니다.

## 기술 스택

- **Framework**: NestJS v10 + TypeScript
- **ORM**: Prisma (PostgreSQL/Supabase)
- **피드 파싱**: rss-parser
- **스케줄러**: @nestjs/schedule (Cron)
- **검증**: class-validator, class-transformer

## 프로젝트 구조

```
src/
├── blog-sources/     # 블로그 소스 CRUD 모듈
├── posts/            # 포스트 조회/관리 모듈
├── feed-fetcher/     # RSS/Atom 피드 수집 및 파싱 모듈
├── database/         # Prisma 서비스 및 생성된 클라이언트
├── app.module.ts     # 루트 모듈
└── main.ts           # 애플리케이션 진입점

prisma/
└── schema.prisma     # 데이터베이스 스키마
```

## 주요 명령어

```bash
# 개발 서버 실행
npm run start:dev

# 빌드
npm run build

# 프로덕션 실행
npm run start:prod

# 린트
npm run lint

# 포맷팅
npm run format

# 테스트
npm run test
npm run test:e2e
npm run test:cov
```

## 환경 변수

```
DATABASE_URL=     # PostgreSQL 연결 URL (Prisma pooling)
DIRECT_URL=       # PostgreSQL 직접 연결 URL
```

## API 엔드포인트

### BlogSources (`/blog-sources`)
- `POST /` - 블로그 소스 생성
- `GET /` - 전체 조회 (`?includeInactive=true`로 비활성 포함)
- `GET /:id` - 단일 조회
- `PATCH /:id` - 수정
- `DELETE /:id` - 삭제

### Posts (`/posts`)
- `GET /` - 포스트 목록 조회 (쿼리 파라미터로 필터링)
- `GET /:id` - 단일 조회
- `PATCH /:id/display` - 표시 여부 변경

### FeedFetcher (`/feed-fetcher`)
- `POST /fetch/:sourceId` - 특정 소스에서 피드 수집
- `POST /fetch-all` - 모든 활성 소스에서 피드 수집

## 데이터 모델

- **BlogSource**: 블로그 피드 소스 (RSS/ATOM URL)
- **Posts**: 수집된 포스트
- **Tags**: 태그
- **PostTags**: 포스트-태그 연결 테이블

## 스케줄러

`FeedSchedulerService`가 매시간(`EVERY_HOUR`) 모든 활성 블로그 소스에서 피드를 자동 수집합니다.

## 개발 가이드라인

- DTO에는 `class-validator` 데코레이터를 사용하여 검증
- 서비스 계층에서 비즈니스 로직 처리
- Prisma 클라이언트는 `src/database/generated/prisma`에 생성됨
- ESLint + Prettier로 코드 스타일 관리 (eslint-plugin-perfectionist 사용)
