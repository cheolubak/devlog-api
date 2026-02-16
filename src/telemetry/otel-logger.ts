import { ConsoleLogger } from '@nestjs/common';
import { logs, SeverityNumber } from '@opentelemetry/api-logs';

export class OtelLogger extends ConsoleLogger {
  private readonly otelLogger = logs.getLogger('devlog-api');

  log(message: any, ...optionalParams: any[]): void {
    super.log(message, ...optionalParams);
    this.emitLog(SeverityNumber.INFO, message, optionalParams);
  }

  error(message: any, ...optionalParams: any[]): void {
    super.error(message, ...optionalParams);
    this.emitLog(SeverityNumber.ERROR, message, optionalParams);
  }

  warn(message: any, ...optionalParams: any[]): void {
    super.warn(message, ...optionalParams);
    this.emitLog(SeverityNumber.WARN, message, optionalParams);
  }

  debug(message: any, ...optionalParams: any[]): void {
    super.debug(message, ...optionalParams);
    this.emitLog(SeverityNumber.DEBUG, message, optionalParams);
  }

  verbose(message: any, ...optionalParams: any[]): void {
    super.verbose(message, ...optionalParams);
    this.emitLog(SeverityNumber.TRACE, message, optionalParams);
  }

  private emitLog(
    severityNumber: SeverityNumber,
    message: any,
    optionalParams: any[],
  ): void {
    const context =
      typeof optionalParams[optionalParams.length - 1] === 'string'
        ? optionalParams[optionalParams.length - 1]
        : undefined;

    const body =
      typeof message === 'string' ? message : JSON.stringify(message);

    const attributes: Record<string, string> = {};
    if (context) {
      attributes['nestjs.context'] = context;
    }

    // error 레벨의 경우 stack trace 포함
    if (
      severityNumber === SeverityNumber.ERROR &&
      typeof optionalParams[0] === 'string'
    ) {
      attributes['exception.stacktrace'] = optionalParams[0];
    }

    this.otelLogger.emit({ attributes, body, severityNumber });
  }
}
