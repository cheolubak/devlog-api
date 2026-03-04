import { logs, SeverityNumber } from '@opentelemetry/api-logs';

const logger = () => logs.getLogger('devlog-api');

export const log = {
  debug: (
    body: string,
    attributes?: Record<string, boolean | number | string>,
  ) => {
    console.debug(body, attributes);
    logger().emit({
      attributes,
      body,
      severityNumber: SeverityNumber.DEBUG,
      severityText: 'DEBUG',
    });
  },
  error: (
    body: string,
    attributes?: Record<string, boolean | number | string>,
  ) => {
    console.debug(body, attributes);
    logger().emit({
      attributes,
      body,
      severityNumber: SeverityNumber.ERROR,
      severityText: 'ERROR',
    });
  },
  info: (
    body: string,
    attributes?: Record<string, boolean | number | string>,
  ) => {
    console.debug(body, attributes);
    logger().emit({
      attributes,
      body,
      severityNumber: SeverityNumber.INFO,
      severityText: 'INFO',
    });
  },
  warn: (
    body: string,
    attributes?: Record<string, boolean | number | string>,
  ) => {
    console.debug(body, attributes);
    logger().emit({
      attributes,
      body,
      severityNumber: SeverityNumber.WARN,
      severityText: 'WARN',
    });
  },
};
