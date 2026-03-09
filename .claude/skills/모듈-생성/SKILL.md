---
name: 모듈-생성
description: 프로젝트 컨벤션에 맞는 NestJS 모듈(module, controller, service, DTO) 스캐폴딩
disable-model-invocation: true
arguments: "[모듈명] (예: notifications, comments)"
---

# NestJS 모듈 스캐폴딩

새로운 NestJS 모듈을 프로젝트 컨벤션에 맞춰 생성합니다.

## 인자

- `모듈명`: kebab-case 모듈 이름 (예: `notifications`, `user-settings`)

## 생성할 파일 목록

```
src/{모듈명}/
├── {모듈명}.module.ts
├── {모듈명}.controller.ts
├── {모듈명}.service.ts
└── dto/
```

## 실행 단계

### 1. 모듈 파일 생성 (`{모듈명}.module.ts`)

참조 패턴: `src/blog-sources/blog-sources.module.ts`

```typescript
import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';
import { {PascalName}Controller } from './{모듈명}.controller';
import { {PascalName}Service } from './{모듈명}.service';

@Module({
  controllers: [{PascalName}Controller],
  exports: [{PascalName}Service],
  imports: [DatabaseModule],
  providers: [{PascalName}Service],
})
export class {PascalName}Module {}
```

컨벤션:
- `@Module` 데코레이터 속성은 **알파벳순** 정렬 (controllers → exports → imports → providers)
- `DatabaseModule`은 반드시 imports에 포함
- 외부 모듈 import는 `../` 상대경로 사용
- 같은 모듈 내 import는 `./` 상대경로 사용

### 2. 컨트롤러 파일 생성 (`{모듈명}.controller.ts`)

참조 패턴: `src/blog-sources/blog-sources.controller.ts`

```typescript
import { Controller } from '@nestjs/common';

import { {PascalName}Service } from './{모듈명}.service';

@Controller('{모듈명}')
export class {PascalName}Controller {
  constructor(private readonly {camelName}Service: {PascalName}Service) {}
}
```

컨벤션:
- `@nestjs/common`, `@nestjs/cache-manager` 등 NestJS 패키지 import를 먼저
- 빈 줄 후 로컬 import
- import 내부 멤버는 알파벳순 (eslint-plugin-perfectionist)
- 데코레이터는 알파벳순 정렬 (`@CacheTTL` → `@Get` → `@UseInterceptors`)
- 캐시가 필요한 GET 엔드포인트는 `@CacheTTL(5 * 60 * 1000)`, `@UseInterceptors(CacheInterceptor)` 사용

### 3. 서비스 파일 생성 (`{모듈명}.service.ts`)

참조 패턴: `src/blog-sources/blog-sources.service.ts`

```typescript
import { Injectable, Logger } from '@nestjs/common';

import { PrismaService } from '../database/prisma.service';

@Injectable()
export class {PascalName}Service {
  private readonly logger = new Logger({PascalName}Service.name);

  constructor(private readonly prisma: PrismaService) {}
}
```

컨벤션:
- `Logger`는 클래스명을 컨텍스트로 사용: `new Logger({PascalName}Service.name)`
- `PrismaService`는 `private readonly prisma`로 주입
- 에러 처리: `NotFoundException`, `ConflictException`, `BadRequestException` 활용
- Prisma 타입 import: `import { Prisma } from '../database/generated/prisma'`
- Prisma enum import: `import { FeedType, RegionType } from '../database/generated/prisma'`
- Prisma 쿼리 결과의 select/include 속성은 알파벳순 정렬

### 4. 루트 모듈에 등록

`src/app.module.ts`의 imports 배열에 새 모듈 추가 (알파벳순 유지):

```typescript
import { {PascalName}Module } from './{모듈명}/{모듈명}.module';

// imports 배열에 알파벳순으로 추가
```

### 5. 네이밍 규칙

| 항목 | 규칙 | 예시 |
|------|------|------|
| 파일명 | kebab-case | `user-settings.service.ts` |
| 클래스명 | PascalCase | `UserSettingsService` |
| 변수명 | camelCase | `userSettingsService` |
| 컨트롤러 경로 | kebab-case | `@Controller('user-settings')` |
| DTO 파일 | `{동작}-{모듈}.dto.ts` | `create-user-setting.dto.ts` |

### 6. import 정렬 규칙 (eslint-plugin-perfectionist)

1. 외부 패키지 (`@nestjs/*`, `class-validator` 등)
2. 빈 줄
3. 프로젝트 내부 모듈 (`../`, `./`)
4. 각 그룹 내에서 알파벳순
5. named import 멤버도 알파벳순
