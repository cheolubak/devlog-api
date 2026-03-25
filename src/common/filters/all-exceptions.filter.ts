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
import { ErrorCode } from '../constants/error-codes';

const STATUS_TO_ERROR_CODE: Record<number, string> = {
  [HttpStatus.BAD_REQUEST]: ErrorCode.VALIDATION_ERROR,
  [HttpStatus.CONFLICT]: ErrorCode.CONFLICT,
  [HttpStatus.FORBIDDEN]: ErrorCode.FORBIDDEN,
  [HttpStatus.INTERNAL_SERVER_ERROR]: ErrorCode.INTERNAL_ERROR,
  [HttpStatus.NOT_FOUND]: ErrorCode.NOT_FOUND,
  [HttpStatus.TOO_MANY_REQUESTS]: ErrorCode.RATE_LIMIT_EXCEEDED,
  [HttpStatus.UNAUTHORIZED]: ErrorCode.AUTH_UNAUTHORIZED,
};

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  private handlePrismaError(exception: Prisma.PrismaClientKnownRequestError): {
    errorCode: string;
    message: string;
    statusCode: number;
  } {
    switch (exception.code) {
      case 'P2002':
        return {
          errorCode: ErrorCode.CONFLICT,
          message: 'A record with this value already exists',
          statusCode: HttpStatus.CONFLICT,
        };
      case 'P2025':
        return {
          errorCode: ErrorCode.NOT_FOUND,
          message: 'Record not found',
          statusCode: HttpStatus.NOT_FOUND,
        };
      default:
        return {
          errorCode: ErrorCode.INTERNAL_ERROR,
          message: 'Internal server error',
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        };
    }
  }

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let statusCode: number;
    let message: string | string[];
    let errorCode: string;

    if (exception instanceof HttpException) {
      statusCode = exception.getStatus();
      const responseBody = exception.getResponse();
      if (typeof responseBody === 'string') {
        message = responseBody;
      } else {
        message =
          (responseBody as { message?: string | string[] }).message ??
          exception.message;
      }
      errorCode = STATUS_TO_ERROR_CODE[statusCode] ?? ErrorCode.INTERNAL_ERROR;
      this.logger.error(`Unhandled Http exception: ${exception.message}`, {
        response: exception.getResponse(),
        status: exception.getStatus(),
      });
    } else if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      const mapped = this.handlePrismaError(exception);
      statusCode = mapped.statusCode;
      message = mapped.message;
      errorCode = mapped.errorCode;
      this.logger.error(
        `Unhandled Prisma exception [${exception.code}]: ${exception.message}`,
      );
    } else if (exception instanceof Error) {
      statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      message = 'Internal server error';
      errorCode = ErrorCode.INTERNAL_ERROR;
      this.logger.error(
        `Unhandled exception: ${exception.message}`,
        exception.stack,
      );
    } else {
      statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      message = 'Internal server error';
      errorCode = ErrorCode.INTERNAL_ERROR;
      this.logger.error(`Unhandled unknown exception: ${String(exception)}`);
    }

    const normalizedMessage = (
      Array.isArray(message) ? message : [message]
    ).map((item) => (typeof item === 'string' ? item : String(item)));

    response.status(statusCode).json({
      errorCode,
      message: normalizedMessage,
      statusCode,
      timestamp: new Date().toISOString(),
    });
  }
}
