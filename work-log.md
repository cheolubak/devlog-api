# Work Log

## 2026-03-19

### PR #8 2차 코드 리뷰 피드백 7건 반영
- **변경 파일**:
  - `src/auth/auth.guard.ts` - Authorization 에러 메시지 분기 (헤더 누락 vs 형식 오류)
  - `src/posts/listeners/post-event.listener.ts` - 한국어 분기 early return 제거, 번역 실패 로깅, stale description 정리
  - `src/feed-fetcher/feed-fetcher.service.ts` - 언어 감지 실패 시 의도된 동작 주석
  - `src/feed-fetcher/feed-scheduler.service.ts` - 미번역 포스트 일일 재시도 크론 (3AM)
  - `src/blog-sources/blog-sources.controller.ts` - Swagger @ApiQuery type 수정
- **내용**: CodeRabbit 2차 리뷰 반영. AuthGuard 에러 구분, 번역 일관성 개선, 미번역 포스트 자동 재시도 스케줄러 추가.
- **커밋**: `00f8490`

### PR #8 코드 리뷰 피드백 6건 반영
- **변경 파일**:
  - `src/auth/admin.guard.ts` - validateAdminKey() static 메서드 추출 (DRY)
  - `src/blog-sources/blog-sources.controller.ts` - CacheInterceptor 제거 (캐시 오염 방지), isValidAdminKey 제거
  - `src/common/filters/all-exceptions.filter.ts` - message 타입 string[] 강제
  - `src/posts/listeners/post-event.listener.ts` - 번역 실패 시 원문 항상 보존
  - `src/posts/posts.controller.ts` - UUID 유틸 사용
  - `src/translate/translate.service.ts` - detectLanguage() try/catch 추가
  - `src/common/utils/uuid.util.ts` - UUID 검증 유틸 신규 생성
- **내용**: CodeRabbit PR 리뷰 코멘트 반영. 캐시 오염 방지, Admin 키 검증 DRY, 에러 처리 일관성, 타입 안전성, 원문 보존 개선.
- **커밋**: `f94b739`

### 리뷰 팀 P1 액션 아이템 7건 수정
- **변경 파일**:
  - `src/auth/auth.guard.ts` - 에러 메시지 구체화
  - `src/search/search.service.ts` - 검색 결과 source.icon 누락 수정
  - `src/feed-fetcher/feed-fetcher.service.ts` - translateUntranslatedPosts 원문 보존
  - `src/auth/auth.service.ts` - leave() 응답 메시지 영문 통일
  - `src/posts/posts.controller.ts` - sessionId UUID 형식 검증
  - `src/feed-fetcher/feed-scheduler.service.ts` - Cron 중복 실행 방지 플래그
  - `src/blog-sources/blog-sources.controller.ts` - includeInactive Admin 인증 보호
- **내용**: 4인 리뷰 팀 분석 P1 이슈 7건 수정. 보안(A5, A9, A11), 데이터 일관성(A6, A7, A8), 안정성(A10) 개선.
- **커밋**: `be83338`

### 번역 로직 개선 (main → dev cherry-pick)
- **변경 파일**:
  - `src/translate/translate.service.ts` - `detectLanguage()` 메서드 추가
  - `src/posts/listeners/post-event.listener.ts` - 언어 감지 기반 양방향 번역, null 저장 방지
  - `src/feed-fetcher/feed-fetcher.service.ts` - region 기반→언어 감지 기반 번역, FOREIGN 원본 보존
- **내용**: main 브랜치의 번역 수정 커밋(7d9c329)이 dev에 누락되어 cherry-pick 적용. isDisplay 변경 시 Google Translate API가 동작하지 않던 문제 해결
- **커밋**: 47dde0f

### 리뷰 팀 P0 액션 아이템 4건 수정
- **변경 파일**:
  - `src/main.ts` - Swagger Admin API Key 헤더명 수정 (x-api-key → x-admin-api-key)
  - `src/feed-fetcher/keyword-extractor.service.ts` - tryConsume 이중 호출 버그 수정
  - `src/common/filters/all-exceptions.filter.ts` - 에러 응답 message 타입 string[] 정규화
  - `src/utils/chunk-parallel.ts` - Promise.all → Promise.allSettled 변경
- **내용**: 4인 리뷰 팀 분석에서 도출된 P0 이슈 수정. Swagger 헤더 불일치로 관리자 API 테스트 불가 해소, Anthropic API 일일 한도 100→200 복원, 에러 응답 타입 일관성 확보, 피드 수집 시 개별 실패 격리.
- **커밋**: `aa0753a`

### PR #7 코멘트 반영 - Zod 스키마 개선
- **변경 파일**:
  - `src/common/pipes/zod-validation.pipe.ts` - 빈 path 에러 메시지 개선
  - `src/blog-sources/dto/create-blog-source.dto.ts` - feedTypeEnumSchema 공유 스키마 적용
  - `src/blog-sources/dto/update-blog-source.dto.ts` - feedTypeEnumSchema 적용 + scrapingConfig 추가
- **내용**: PR 리뷰 코멘트 반영. 인라인 FeedType enum을 공유 스키마로 교체, update DTO에 scrapingConfig 필드 추가, ZodValidationPipe의 최상위 에러 path 처리 개선.
- **커밋**: `f70a74d`

### class-validator → Zod 마이그레이션
- **변경 파일**:
  - `src/common/pipes/zod-validation.pipe.ts` - ZodValidationPipe 생성
  - `src/blog-sources/dto/create-blog-source.dto.ts` - Zod 스키마로 전환
  - `src/blog-sources/dto/update-blog-source.dto.ts` - Zod 스키마로 전환
  - `src/blog-sources/dto/scraping-config.dto.ts` - Zod 스키마로 전환
  - `src/posts/dto/post-query.dto.ts` - Zod 스키마로 전환
  - `src/posts/dto/update-display.dto.ts` - Zod 스키마로 전환
  - `src/posts/dto/update-keyword.dto.ts` - Zod 스키마로 전환
  - `src/posts/dto/update-thumbnail.dto.ts` - Zod 스키마로 전환
  - `src/auth/dto/social-login.dto.ts` - Zod 스키마로 전환
  - `src/auth/dto/refresh-token.dto.ts` - Zod 스키마로 전환
  - `src/search/dto/search-query.dto.ts` - Zod 스키마로 전환
  - `src/request/dto/request.dto.ts` - Zod 스키마로 전환
  - `src/blog-sources/blog-sources.controller.ts` - ZodValidationPipe 적용
  - `src/posts/posts.controller.ts` - ZodValidationPipe 적용
  - `src/auth/auth.controller.ts` - ZodValidationPipe 적용
  - `src/search/search.controller.ts` - ZodValidationPipe 적용
  - `src/request/request.controller.ts` - ZodValidationPipe 적용
  - `src/main.ts` - global ValidationPipe 제거
  - `CLAUDE.md` - 기술 스택/가이드라인 업데이트
  - `package.json` - zod 추가, class-validator/class-transformer 제거
- **내용**: class-validator/class-transformer 기반 DTO를 Zod v4 스키마로 전환. 각 DTO 파일에서 스키마와 타입을 함께 export하고, 컨트롤러에서 파라미터별 ZodValidationPipe 적용 방식으로 변경.

## 2026-03-18

### 4인 리뷰 팀 분석 기반 코드 수정 (11개 커밋)

UX 전문가, 기술 아키텍트, 비판적 검토자, 최종 검토자 4명으로 구성된 리뷰 팀이 프로젝트를 다각도로 분석하여 도출된 이슈를 수정.

- **변경 파일**:
  - `package.json` - 미사용 typeorm 의존성 제거
  - `src/auth/admin.guard.ts` - timing-safe 비교 적용
  - `src/posts/posts.controller.ts` - ParseUUIDPipe 적용
  - `src/blog-sources/blog-sources.controller.ts` - ParseUUIDPipe, 파일 업로드 제한
  - `src/feed-fetcher/feed-fetcher.controller.ts` - ParseUUIDPipe 적용
  - `src/posts/dto/post-query.dto.ts` - @Max(100), ids null safety
  - `src/search/dto/search-query.dto.ts` - @Max(100)
  - `src/posts/posts.service.ts` - BadRequestException 메시지 추가
  - `src/common/filters/all-exceptions.filter.ts` - statusCode 추가, Prisma 에러 매핑
  - `src/common/utils/url-validator.util.ts` - SSRF 방지 URL 검증 유틸 (신규)
  - `src/image-parse/image-parse.service.ts` - SSRF 검증 적용
  - `src/main.ts` - CORS wildcard fallback 제거
  - `test/` - E2E 테스트 region 필드 추가, 존재하지 않는 엔드포인트 테스트 제거

- **내용**: 보안(SSRF, timing attack), 입력 검증(ParseUUIDPipe, @Max), 에러 처리(Prisma 매핑, statusCode), 테스트 정합성(region 필드, 삭제된 엔드포인트) 등 11건의 이슈 수정

- **커밋**:
  - `0ad062f` chore: 미사용 typeorm 의존성 제거
  - `aed2faa` fix: AdminGuard에 timing-safe 비교 적용
  - `4361cd9` fix: 모든 컨트롤러에 ParseUUIDPipe 적용
  - `8ced570` fix: DTO 입력 검증 강화
  - `948d64f` fix: deletePost의 BadRequestException에 설명 메시지 추가
  - `062fa6f` fix: AllExceptionsFilter 에러 응답 개선
  - `a299cf4` fix: 파일 업로드에 크기/타입 제한 추가
  - `abec41a` fix: SSRF 방지를 위한 외부 URL 검증 추가
  - `a6219bd` fix: CORS origin wildcard fallback을 localhost로 변경
  - `90d8db6` fix: E2E 테스트 수정
  - `f041ad1` fix: 린트 에러 수정

### P0 이슈 수정 (2건)

미해결 P0 이슈로 식별된 JWT 보안 결함과 TypeScript strict mode를 수정.

- **변경 파일**:
  - `src/auth/auth.service.ts` - JWT refresh token secret을 HMAC-SHA256 키 파생으로 변경
  - `tsconfig.json` - strict: true 활성화
  - 36개 파일 - strict mode로 인한 137개 타입 에러 수정

- **내용**:
  1. JWT refresh token secret이 단순 문자열 연결(`JWT_SECRET + sessionId`)이던 것을 HMAC-SHA256 기반 키 파생으로 변경 (기존 refresh token 무효화, 재로그인 필요)
  2. TypeScript strict mode 활성화 및 전체 타입 에러 수정 (DTO definite assignment, catch unknown 타입, controller Request 타입, null safety 등)

- **커밋**:
  - `83daab4` fix: JWT refresh token secret을 HMAC-SHA256 키 파생으로 변경
  - `c3e17a4` fix: TypeScript strict mode 활성화 및 137개 타입 에러 수정

### P1 이슈 수정 (5건)

- **변경 파일**:
  - `src/feed-fetcher/web-scraper.service.ts` - Puppeteer 리소스 차단, 10페이지마다 브라우저 재시작
  - `src/posts/posts.service.ts` - updateDisplay 부수효과 제거
  - `src/posts/listeners/post-event.listener.ts` - 키워드 추출/번역을 이벤트 리스너로 분리 (신규)
  - `src/posts/constants/post-events.ts` - 이벤트 상수 (신규)
  - `src/posts/events/post-display-updated.event.ts` - 이벤트 클래스 (신규)
  - `prisma/migrations/20260318063329_add_pg_trgm_indexes/migration.sql` - pg_trgm GIN 인덱스 (신규)
  - `src/common/services/api-usage.service.ts` - API 사용량 추적 서비스 (신규)
  - `src/common/common.module.ts` - CommonModule (신규)
  - `src/feed-fetcher/keyword-extractor.service.ts` - Anthropic API 일일 한도 체크
  - `src/translate/translate.service.ts` - Google Translate API 일일 한도 체크
  - `src/feed-fetcher/youtube-fetcher.service.ts` - YouTube API 일일 한도 체크
  - `src/common/utils/url-validator.util.spec.ts` - URL 검증 유닛 테스트 (신규)
  - `src/posts/posts.service.spec.ts` - PostsService 유닛 테스트 (신규)
  - `src/auth/admin.guard.spec.ts` - AdminGuard 유닛 테스트 (신규)

- **내용**:
  1. Puppeteer OOM 완화: 불필요 리소스 차단, 브라우저 자동 재시작
  2. updateDisplay 부수효과: @nestjs/event-emitter로 비동기 분리
  3. ILIKE 검색 성능: pg_trgm GIN 인덱스 마이그레이션 추가
  4. 외부 API 비용 통제: 일일 사용량 추적/제한 서비스 추가
  5. 유닛 테스트: 3개 파일, 31개 테스트 추가

- **커밋**:
  - `5c0d393` fix: Puppeteer OOM 위험 완화
  - `f95fd57` refactor: updateDisplay 부수효과를 이벤트 기반으로 분리
  - `b301bd5` perf: ILIKE 검색 성능 개선을 위한 pg_trgm GIN 인덱스 추가
  - `24cd24b` feat: 외부 API 일일 사용량 제한 추가
  - `bb31ae4` test: 핵심 서비스 유닛 테스트 추가 (31개)

### P2 이슈 수정 (5건)

- **변경 파일**:
  - `src/search/search.service.ts` - 검색 쿼리를 OR 조건으로 리팩토링
  - `src/main.ts` - Swagger DocumentBuilder 설정 추가
  - 6개 컨트롤러 - @ApiTags, @ApiOperation, @ApiSecurity, @ApiBearerAuth 추가
  - `src/posts/services/view-history-cleanup.service.ts` - 조회 기록 자동 정리 서비스 (신규)
  - `.github/workflows/ci.yml` - CI 파이프라인 (신규)
  - 3개 spec 파일 - 추가 유닛 테스트 (신규)

- **내용**:
  1. 검색 쿼리 리팩토링: 문자열 연결 → OR 조건으로 변경하여 pg_trgm 인덱스 활용 가능
  2. Swagger/OpenAPI: /api-docs 경로에서 API 문서 제공, 인증 데코레이터 적용
  3. PostViewHistory 보존: 90일(기본) 이상 된 조회 기록 매일 3AM 자동 삭제
  4. CI/CD: GitHub Actions로 lint/build/test 자동 실행
  5. 유닛 테스트 확대: 총 61개 (SearchService, ApiUsageService, AuthService 추가)

- **커밋**:
  - `602b161` perf: 검색 쿼리를 OR 조건으로 리팩토링
  - `435c5df` feat: Swagger/OpenAPI 문서화 추가
  - `7d71330` feat: PostViewHistory 보존 정책 추가
  - `4f5e28c` ci: GitHub Actions CI 파이프라인 추가
  - `44c912e` test: 유닛 테스트 확대
