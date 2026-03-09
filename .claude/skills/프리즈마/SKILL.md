---
name: 프리즈마
description: Prisma 스키마 수정, 마이그레이션 생성, 클라이언트 재생성
disable-model-invocation: true
arguments: "[작업 설명] (예: Posts에 likeCount 필드 추가)"
---

# Prisma 스키마 변경 & 마이그레이션

Prisma 스키마를 수정하고 마이그레이션을 생성합니다.

## 인자

- `작업 설명`: 수행할 스키마 변경 내용 (예: `Posts에 likeCount 필드 추가`, `Comments 모델 생성`)

## 스키마 파일 위치

- **스키마**: `prisma/schema.prisma`
- **생성 클라이언트**: `src/database/generated/prisma`

## 실행 단계

### 1. 스키마 수정

`prisma/schema.prisma` 파일을 수정합니다.

### 2. 스키마 컨벤션

#### 모델 정의

```prisma
model ModelName {
  id        String   @db.Uuid @id @default(uuid())
  name      String   @db.VarChar(100)
  content   String   @db.Text
  count     Int      @default(0)
  isActive  Boolean  @default(true)
  metadata  Json?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt @default(now())

  // 관계 필드
  posts     Posts[]

  // 인덱스
  @@index([fieldName])
}
```

#### 필드 타입 매핑 (`@db.*`)

| Prisma 타입 | PostgreSQL 타입 | 예시 |
|-------------|-----------------|------|
| `String` (ID) | `@db.Uuid` | `id String @db.Uuid @id @default(uuid())` |
| `String` (짧은 텍스트) | `@db.VarChar(N)` | `name String @db.VarChar(100)` |
| `String` (긴 텍스트) | `@db.Text` | `content String @db.Text` |
| `String` (URL) | `@db.VarChar(500)` or `@db.VarChar(1000)` | `url String @db.VarChar(500)` |
| `Int` | 기본값 사용 | `count Int @default(0)` |
| `DateTime` | 기본값 사용 | `createdAt DateTime @default(now())` |
| `Json` | 기본값 사용 | `metadata Json?` |

#### 네이밍 컨벤션

- **모델명**: PascalCase (예: `BlogSource`, `PostTags`)
- **필드명**: camelCase (예: `isActive`, `lastFetchedAt`)
- **snake_case 매핑이 필요한 경우**: `@map("snake_case")` 사용 (예: `viewCount Int @map("view_count")`)
- **테이블명 매핑**: `@@map("table_name")` (예: `@@map("post_bookmarks")`)
- **enum명**: PascalCase (예: `FeedType`, `RegionType`)
- **enum 값**: UPPER_CASE (예: `RSS`, `PENDING`, `SUCCESS`)

#### Enum 정의

```prisma
enum EnumName {
  VALUE_ONE
  VALUE_TWO

  @@map("enum_name")  // snake_case 테이블명이 필요한 경우
}
```

#### 관계 정의

```prisma
// 1:N 관계 (부모 측)
posts Posts[]

// 1:N 관계 (자식 측)
sourceId String?     @db.Uuid
source   BlogSource? @relation(fields: [sourceId], references: [id])

// 복합 키
@@id([postId, tagId])

// 유니크 제약
@@unique([socialId, socialType])
```

#### 인덱스

```prisma
@@index([fieldName])
@@index([field1, field2])  // 복합 인덱스
```

자주 조회하는 필드, WHERE 절에 사용되는 필드에 인덱스를 추가합니다.

### 3. 마이그레이션 생성 & 적용

```bash
# 마이그레이션 생성 (이름은 snake_case)
pnpm prisma migrate dev --name {migration_name}
```

마이그레이션 이름 예시:
- `add_like_count_to_posts`
- `create_comments_table`
- `add_index_on_created_at`

### 4. 클라이언트 재생성

마이그레이션이 성공하면 클라이언트가 자동 재생성됩니다.
수동으로 재생성이 필요한 경우:

```bash
pnpm prisma generate
```

생성 경로: `src/database/generated/prisma`

### 5. 서비스에서 사용

```typescript
// 새 모델 사용
import { PrismaService } from '../database/prisma.service';

this.prisma.{modelName}.findMany({ ... });

// 새 enum 사용
import { EnumName } from '../database/generated/prisma';

// Prisma 타입 사용
import { Prisma } from '../database/generated/prisma';
const where: Prisma.{ModelName}WhereInput = { ... };
```

### 6. 주의사항

- 기존 데이터가 있는 테이블에 `NOT NULL` 필드를 추가할 때는 `@default()` 값을 설정하거나 optional(`?`)로 만들기
- `@updatedAt`은 Prisma가 자동으로 업데이트 시간을 관리
- UUID 필드는 반드시 `@db.Uuid`를 명시
- `generator client`의 `output` 경로 변경 금지
