import { logs } from '@opentelemetry/api-logs';
import { OTLPLogExporter } from '@opentelemetry/exporter-logs-otlp-http';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { resourceFromAttributes } from '@opentelemetry/resources';
import {
  BatchLogRecordProcessor,
  LoggerProvider,
} from '@opentelemetry/sdk-logs';
import {
  BatchSpanProcessor,
  NodeTracerProvider,
} from '@opentelemetry/sdk-trace-node';
import { ATTR_SERVICE_NAME } from '@opentelemetry/semantic-conventions';

export function setupTelemetry(): void {
  const endpoint = process.env.OTEL_EXPORTER_OTLP_ENDPOINT;
  const authorization = process.env.OTEL_EXPORTER_OTLP_HEADERS_Authorization;

  if (!endpoint || !authorization) {
    console.warn(
      '[Telemetry] OTEL_EXPORTER_OTLP_ENDPOINT 또는 OTEL_EXPORTER_OTLP_HEADERS_Authorization 환경 변수가 없어 OpenTelemetry를 초기화하지 않습니다.',
    );
    return;
  }

  const headers = { Authorization: decodeURIComponent(authorization) };

  const resource = resourceFromAttributes({
    [ATTR_SERVICE_NAME]: 'devlog-api',
  });

  const traceExporter = new OTLPTraceExporter({
    headers,
    url: `${endpoint}/v1/traces`,
  });

  const tracerProvider = new NodeTracerProvider({
    resource,
    spanProcessors: [new BatchSpanProcessor(traceExporter)],
  });
  tracerProvider.register();

  const logExporter = new OTLPLogExporter({
    headers,
    url: `${endpoint}/v1/logs`,
  });

  const loggerProvider = new LoggerProvider({
    processors: [new BatchLogRecordProcessor(logExporter)],
    resource,
  });

  logs.setGlobalLoggerProvider(loggerProvider);
}
