import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

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
    origin: process.env.CORS_ORIGIN?.split(',') || '*',
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

  await app.listen(4000);
}
bootstrap();
