---
name: DTO-생성
description: 프로젝트 컨벤션에 맞는 class-validator 기반 DTO 클래스 생성
disable-model-invocation: true
arguments: "[모듈명] [DTO 용도] (예: posts CreateComment, posts PostQuery)"
---

# DTO 생성

프로젝트 컨벤션에 맞는 class-validator/class-transformer 기반 DTO를 생성합니다.

## 인자

- `모듈명`: 대상 모듈 (예: `posts`, `blog-sources`)
- `DTO 용도`: DTO의 용도 (예: `CreateComment`, `UpdateSetting`, `PostQuery`)

## 파일 위치

- `src/{모듈명}/dto/{kebab-case-dto-name}.dto.ts`
- 예: `src/posts/dto/create-comment.dto.ts`

## 실행 단계

### 1. DTO 타입 결정

| DTO 용도 | 접두사 | 설명 |
|----------|--------|------|
| 생성 요청 | `Create{Name}Dto` | `@Body()`로 전달되는 생성 데이터 |
| 수정 요청 | `Update{Name}Dto` | `@Body()`로 전달되는 수정 데이터 |
| 쿼리 파라미터 | `{Name}QueryDto` | `@Query()`로 전달되는 조회 조건 |
| 응답 | 사용하지 않음 | Prisma select/include로 직접 제어 |

### 2. Create/Update DTO 패턴

참조: `src/blog-sources/dto/create-blog-source.dto.ts`

```typescript
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

import { SomeEnum } from '../../database/generated/prisma';

export class Create{Name}Dto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsEnum(SomeEnum)
  type: SomeEnum;
}
```

### 3. Query DTO 패턴

참조: `src/posts/dto/post-query.dto.ts`

```typescript
import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';

export class {Name}QueryDto {
  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => value === 'true')
  isActive?: boolean;

  @IsInt()
  @IsOptional()
  @Min(1)
  @Transform(({ value }) => parseInt(value, 10))
  limit?: number = 20;

  @IsInt()
  @IsOptional()
  @Min(0)
  @Transform(({ value }) => parseInt(value, 10))
  offset?: number = 0;

  @IsOptional()
  @IsUUID()
  sourceId?: string;

  @IsOptional()
  @IsString()
  tag?: string;
}
```

### 4. Update DTO (PartialType 사용)

```typescript
import { PartialType } from '@nestjs/mapped-types';

import { Create{Name}Dto } from './create-{name}.dto';

export class Update{Name}Dto extends PartialType(Create{Name}Dto) {}
```

### 5. 컨벤션 규칙

#### 데코레이터 정렬

데코레이터는 **알파벳순**으로 정렬합니다:

```typescript
// 올바른 순서
@IsBoolean()
@IsOptional()
@Transform(({ value }) => value === 'true')
isActive?: boolean;

// 올바른 순서
@IsEnum(FeedType)
@IsNotEmpty()
region: RegionType;
```

#### 프로퍼티 정렬

프로퍼티도 **알파벳순**으로 정렬합니다.

#### 자주 사용하는 데코레이터

| 데코레이터 | 용도 |
|------------|------|
| `@IsString()` | 문자열 검증 |
| `@IsNotEmpty()` | 빈 값 금지 |
| `@IsOptional()` | 선택적 필드 |
| `@IsUUID()` | UUID 형식 검증 |
| `@IsEnum(EnumType)` | enum 값 검증 |
| `@IsBoolean()` | boolean 검증 |
| `@IsInt()` | 정수 검증 |
| `@IsUrl()` | URL 형식 검증 |
| `@IsArray()` | 배열 검증 |
| `@Min(n)` | 최솟값 검증 |
| `@MaxLength(n)` | 최대 길이 검증 |
| `@Transform()` | 값 변환 |
| `@ValidateNested()` | 중첩 객체 검증 |
| `@Type(() => Class)` | 중첩 객체 타입 변환 |

#### Transform 패턴 (쿼리 파라미터용)

쿼리 파라미터는 문자열로 전달되므로 `@Transform`으로 변환합니다:

```typescript
// boolean 변환
@Transform(({ value }) => value === 'true')

// number 변환
@Transform(({ value }) => parseInt(value, 10))

// 배열 변환 (단일 값도 배열로)
@Transform(({ value }) => (Array.isArray(value) ? value : [value]))

// 콤마 구분 문자열 → 배열
@Transform(({ value }) => (Array.isArray(value) ? value : value.split(',')))
```

#### Enum import 경로

```typescript
import { FeedType, RegionType } from '../../database/generated/prisma';
```

### 6. import 정렬

1. `class-transformer` (Transform, Type)
2. `class-validator` (데코레이터들)
3. 빈 줄
4. 프로젝트 내부 import (enum, 다른 DTO 등)

각 그룹 내에서 알파벳순 정렬합니다.
