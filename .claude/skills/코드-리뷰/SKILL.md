---
name: 코드-리뷰
description: 변경된 코드에 대해 프로젝트 컨벤션 기반 코드 리뷰 수행
disable-model-invocation: true
---

# 프로젝트 맞춤 코드 리뷰

git diff 기반으로 변경된 코드를 프로젝트 컨벤션에 맞춰 리뷰합니다.

## 실행 단계

### 1. 변경 사항 확인

staged 및 unstaged 변경 사항을 모두 확인합니다:

```bash
git diff
git diff --cached
git diff --stat
```

### 2. 리뷰 체크리스트

변경된 각 파일에 대해 아래 항목을 검토합니다.

#### 구조 & 네이밍

- [ ] **파일 위치**: 올바른 모듈 디렉토리에 위치하는가
- [ ] **파일명**: kebab-case 사용 (예: `blog-sources.service.ts`)
- [ ] **클래스명**: PascalCase, 파일명과 일치 (예: `BlogSourcesService`)
- [ ] **import 정렬**: eslint-plugin-perfectionist 규칙 준수
  - 외부 패키지 → 빈 줄 → 내부 모듈
  - 각 그룹 내 알파벳순
  - named import 멤버도 알파벳순

#### NestJS 패턴

- [ ] **모듈 등록**: 새 모듈이 `app.module.ts`에 등록되었는가
- [ ] **모듈 구조**: `@Module` 속성이 알파벳순인가 (controllers → exports → imports → providers)
- [ ] **DI 패턴**: `private readonly` 접근자 사용
- [ ] **Logger**: `new Logger(ClassName.name)` 패턴 사용
- [ ] **컨트롤러 데코레이터**: 알파벳순 정렬 (`@CacheTTL` → `@Get` → `@UseInterceptors`)

#### DTO & 검증

- [ ] **class-validator**: 모든 DTO 프로퍼티에 검증 데코레이터 적용
- [ ] **데코레이터 순서**: 알파벳순 정렬
- [ ] **프로퍼티 순서**: 알파벳순 정렬
- [ ] **Transform**: 쿼리 파라미터 DTO에 `@Transform` 적용 (boolean, number 변환)
- [ ] **Enum import**: `../../database/generated/prisma`에서 import

#### Prisma 사용

- [ ] **타입 매핑**: `@db.Uuid`, `@db.VarChar(N)`, `@db.Text` 적절히 사용
- [ ] **인덱스**: WHERE 절에 자주 사용되는 필드에 `@@index` 추가
- [ ] **select/include**: 필요한 필드만 select (알파벳순 정렬)
- [ ] **where 조건**: `Prisma.{Model}WhereInput` 타입 활용
- [ ] **@map**: snake_case 컬럼명 매핑 필요 시 사용

#### 에러 처리

- [ ] **NotFoundException**: 리소스를 찾지 못한 경우
- [ ] **ConflictException**: 중복 데이터 생성 시도
- [ ] **BadRequestException**: 잘못된 요청
- [ ] **존재 확인**: 수정/삭제 전 `findUnique`로 존재 여부 확인

#### 캐시

- [ ] **GET 엔드포인트**: 목록 조회 시 `@CacheTTL` + `@UseInterceptors(CacheInterceptor)` 적용 고려
- [ ] **TTL**: `5 * 60 * 1000` (5분) 기본값

#### 보안

- [ ] **인증이 필요한 엔드포인트**: `@UseGuards(AuthGuard)` 적용 여부 확인
- [ ] **입력 검증**: 모든 사용자 입력에 class-validator 적용
- [ ] **SQL 인젝션**: Prisma 사용으로 기본 방어되지만 raw query 사용 시 주의

#### 소프트 삭제

- [ ] **삭제 패턴**: 실제 삭제 대신 `isActive: false` 또는 `PostDeletionLog` 사용
- [ ] **조회 시**: `deletionLog: null` 또는 `isActive: true` 조건 포함

### 3. 리뷰 결과 형식

리뷰 결과를 다음 형식으로 정리합니다:

```
## 코드 리뷰 결과

### 필수 수정 (Must Fix)
- [파일:라인] 설명

### 권장 수정 (Should Fix)
- [파일:라인] 설명

### 참고 (Note)
- [파일:라인] 설명
```

### 4. 자동 수정 가능 항목

lint/format 이슈는 자동 수정을 제안합니다:

```bash
pnpm lint --fix
pnpm format
```
