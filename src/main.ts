import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { OtelLogger } from './telemetry/otel-logger';
import { setupTelemetry } from './telemetry/setup';

setupTelemetry();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new OtelLogger(),
  });

  app.enableCors({
    credentials: true,
    origin: process.env.CORS_ORIGIN?.split(',') || 'http://localhost:3000',
  });

  app.enableShutdownHooks();

  app.useGlobalFilters(new AllExceptionsFilter());

  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true,
      transform: true,
      whitelist: true,
    }),
  );

  if (process.env.NODE_ENV !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('Devlog API')
      .setDescription('RSS/Atom 피드 수집 블로그 포스트 관리 API')
      .setVersion('1.0')
      .addApiKey(
        { in: 'header', name: 'x-api-key', type: 'apiKey' },
        'admin-api-key',
      )
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api-docs', app, document);
  }

  await app.listen(4000);
}
bootstrap();
