import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { OtelLogger } from './telemetry/otel-logger';
import { setupTelemetry } from './telemetry/setup';

setupTelemetry();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new OtelLogger(),
  });

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
