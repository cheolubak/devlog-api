---
name: 피드-테스트
description: 특정 블로그 소스의 피드 수집을 테스트하고 결과를 확인
disable-model-invocation: true
arguments: "[sourceId 또는 URL] (예: abc-123-uuid)"
---

# 피드 수집 테스트

특정 블로그 소스의 피드 수집을 테스트하고 결과를 확인합니다.

## 인자

- `sourceId`: 블로그 소스 UUID (예: `abc-123-uuid`)
- 또는 `URL`: RSS/Atom 피드 URL (새 소스 테스트 시)

## 실행 단계

### 1. 개발 서버 확인

개발 서버가 실행 중인지 확인합니다:

```bash
curl -s http://localhost:3000 > /dev/null && echo "서버 실행 중" || echo "서버 미실행 - pnpm start:dev 필요"
```

### 2-A. sourceId로 테스트

#### 소스 정보 확인

```bash
curl -s http://localhost:3000/blog-sources/{sourceId} | jq .
```

#### 피드 수집 실행

```bash
curl -X POST http://localhost:3000/feed-fetcher/fetch/{sourceId}
```

#### 수집 결과 확인

```bash
# 최근 수집된 포스트 확인
curl -s "http://localhost:3000/posts?sourceId={sourceId}&limit=5" | jq '.data[] | {title, originalPublishedAt, sourceUrl}'
```

#### 소스 상태 재확인

```bash
curl -s http://localhost:3000/blog-sources/{sourceId} | jq '{lastFetchedAt, lastFetchStatus, lastFetchError, totalPostsFetched}'
```

### 2-B. URL로 테스트 (새 소스)

#### 피드 파싱 가능 여부 확인

```bash
# RSS/Atom 피드 직접 접근 테스트
curl -s -o /dev/null -w "%{http_code}" "{feedUrl}"
```

#### 소스 등록 후 테스트

```bash
# 소스 등록
curl -X POST http://localhost:3000/blog-sources \
  -H "Content-Type: application/json" \
  -d '{
    "name": "테스트 블로그",
    "url": "{feedUrl}",
    "blogUrl": "{blogUrl}",
    "type": "RSS",
    "region": "KOREA"
  }'

# 반환된 id로 피드 수집 실행
curl -X POST http://localhost:3000/feed-fetcher/fetch/{반환된id}
```

### 3. 전체 소스 피드 수집

```bash
curl -X POST http://localhost:3000/feed-fetcher/fetch-all
```

### 4. 트러블슈팅

#### 일반적인 에러 유형

| 에러 | 원인 | 해결 |
|------|------|------|
| `FAILED` / fetch error | 피드 URL 접근 불가 | URL 유효성 확인, CORS/차단 여부 확인 |
| `FAILED` / socket hang up (ECONNRESET) | 원격 서버가 TCP 연결 갑자기 종료 | `withRetry` 적용됨 — 로그에서 재시도 메시지 확인 후 최종 결과 확인 |
| `PARTIAL` | 일부 포스트 파싱 실패 | 로그에서 실패한 항목 확인 |
| 중복 포스트 무시 | `sourceUrl` unique 제약 | 정상 동작 (contentHash 기반 중복 체크) |
| 타입 불일치 | RSS/ATOM 타입 잘못 설정 | 소스 type 수정 |

#### 로그 확인

개발 서버 콘솔에서 `FeedFetcherService` 로그를 확인합니다:

```
[FeedFetcherService] Fetching feed from {url}
[FeedFetcherService] Found {n} new posts from {sourceName}
```

#### 소스 상태 값

- `PENDING`: 아직 수집 시도 안 함
- `SUCCESS`: 마지막 수집 성공
- `FAILED`: 마지막 수집 실패 (`lastFetchError`에 에러 메시지)
- `PARTIAL`: 일부 성공, 일부 실패

### 5. 수집 후 확인 사항

- [ ] `lastFetchStatus`가 `SUCCESS`인지 확인
- [ ] `lastFetchError`가 `null`인지 확인
- [ ] 새 포스트가 DB에 저장되었는지 확인
- [ ] 포스트의 `title`, `content`, `sourceUrl`, `originalPublishedAt` 필드가 정상인지 확인
- [ ] `isDisplay`가 기본값 `false`인지 확인
