---
name: 프로젝트-컨벤션
description: devlog-api 프로젝트의 코딩 컨벤션 및 패턴 참조 (코드 작성 시 자동 참고)
user-invocable: false
---

# devlog-api 프로젝트 컨벤션

코드 작성 시 반드시 준수해야 하는 프로젝트 컨벤션입니다.

## 파일 구조

```
src/{모듈명}/
├── {모듈명}.module.ts       # 모듈 정의
├── {모듈명}.controller.ts   # 컨트롤러
├── {모듈명}.service.ts      # 서비스 (비즈니스 로직)
└── dto/                     # DTO 클래스
    ├── create-{name}.dto.ts
    ├── update-{name}.dto.ts
    └── {name}-query.dto.ts
```

## Import 정렬 (eslint-plugin-perfectionist)

```typescript
// 1. 외부 패키지 (알파벳순)
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import { Controller, Get, Param } from '@nestjs/common';

// 2. 빈 줄 후 내부 모듈 (알파벳순)
import { PrismaService } from '../database/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
```

- named import 멤버도 알파벳순: `{ Body, Controller, Get, Param }`

## NestJS 패턴

### 모듈 (`@Module` 속성 알파벳순)

```typescript
@Module({
  controllers: [...],
  exports: [...],
  imports: [DatabaseModule, ...],
  providers: [...],
})
```

### 서비스

```typescript
@Injectable()
export class ExampleService {
  private readonly logger = new Logger(ExampleService.name);

  constructor(private readonly prisma: PrismaService) {}
}
```

### 컨트롤러 데코레이터 (알파벳순)

```typescript
@CacheTTL(5 * 60 * 1000)
@Get()
@UseInterceptors(CacheInterceptor)
findAll() { ... }
```

## Prisma 사용 패턴

### Import

```typescript
// 타입
import { Prisma } from '../database/generated/prisma';
// Enum
import { FeedType, RegionType } from '../database/generated/prisma';
```

### 쿼리 작성

```typescript
// where 조건 타입 지정
const where: Prisma.PostsWhereInput = { ... };

// select 필드 알파벳순
this.prisma.posts.findMany({
  orderBy: { originalPublishedAt: 'desc' },
  select: {
    description: true,
    id: true,
    imageUrl: true,
    title: true,
  },
  where,
});
```

### 존재 확인 후 수정/삭제

```typescript
const entity = await this.prisma.model.findUnique({ where: { id } });
if (!entity) {
  throw new NotFoundException('Entity not found');
}
```

## DTO 패턴

### 데코레이터 & 프로퍼티 알파벳순

```typescript
export class ExampleDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  name: string;

  @IsEnum(SomeEnum)
  @IsOptional()
  type?: SomeEnum;
}
```

### 쿼리 파라미터 Transform

```typescript
@IsBoolean()
@IsOptional()
@Transform(({ value }) => value === 'true')
isActive?: boolean;

@IsInt()
@IsOptional()
@Min(1)
@Transform(({ value }) => parseInt(value, 10))
limit?: number = 20;
```

## 에러 처리

| 상황 | 예외 클래스 |
|------|------------|
| 리소스 미발견 | `NotFoundException` |
| 중복 데이터 | `ConflictException` |
| 잘못된 요청 | `BadRequestException` |

## 페이지네이션

```typescript
{
  data: items,
  pagination: {
    hasMore: offset * limit + limit < total,
    limit,
    offset,
    total,
  },
}
```

## 소프트 삭제

- BlogSource: `isActive: false`로 비활성화
- Posts: `PostDeletionLog` 레코드 생성
- 조회 시: `deletionLog: null` 또는 `isActive: true` 조건 포함

## 캐시

```typescript
@CacheTTL(5 * 60 * 1000)  // 5분
@Get()
@UseInterceptors(CacheInterceptor)
```

## Prisma 스키마 컨벤션

- UUID 필드: `@db.Uuid @id @default(uuid())`
- 짧은 문자열: `@db.VarChar(N)`
- 긴 텍스트: `@db.Text`
- snake_case 매핑: `@map("column_name")`, `@@map("table_name")`
- 인덱스: 자주 조회하는 필드에 `@@index([field])`
