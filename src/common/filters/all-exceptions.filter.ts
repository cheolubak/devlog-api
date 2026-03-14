import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';

import { Prisma } from '../../database/generated/prisma/client';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const statusCode =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? exception.message
        : 'Internal server error';

    if (exception instanceof HttpException) {
      this.logger.error(`Unhandled Http exception: ${exception.message}`, {
        response: exception.getResponse(),
        status: exception.getStatus(),
      });
    } else if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      this.logger.error(
        `Unhandled Prisma exception [${exception.code}]: ${exception.message}`,
        exception.stack,
      );
    } else if (exception instanceof Error) {
      this.logger.error(
        `Unhandled exception: ${exception.message}`,
        exception.stack,
      );
    } else {
      this.logger.error(`Unhandled unknown exception: ${String(exception)}`);
    }

    response.status(statusCode).json({
      message,
      timestamp: new Date().toISOString(),
    });
  }
}
