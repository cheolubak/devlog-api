import { URL } from 'url';

const BLOCKED_HOSTNAMES = new Set([
  'localhost',
  '127.0.0.1',
  '0.0.0.0',
  '[::1]',
  'metadata.google.internal',
]);

/**
 * 사설 IP 대역인지 확인합니다.
 * 10.x.x.x, 172.16-31.x.x, 192.168.x.x, 169.254.x.x (link-local)
 */
function isPrivateIp(hostname: string): boolean {
  const parts = hostname.split('.').map(Number);
  if (parts.length !== 4 || parts.some((p) => isNaN(p))) return false;

  // 10.0.0.0/8
  if (parts[0] === 10) return true;
  // 172.16.0.0/12
  if (parts[0] === 172 && parts[1] >= 16 && parts[1] <= 31) return true;
  // 192.168.0.0/16
  if (parts[0] === 192 && parts[1] === 168) return true;
  // 169.254.0.0/16 (link-local, AWS metadata)
  if (parts[0] === 169 && parts[1] === 254) return true;
  // 0.0.0.0/8
  if (parts[0] === 0) return true;

  return false;
}

/**
 * 외부 URL이 안전한지 검증합니다.
 * SSRF 방지를 위해 사설 IP, 로컬호스트, 클라우드 메타데이터 엔드포인트를 차단합니다.
 */
export function validateExternalUrl(urlString: string): void {
  let parsed: URL;
  try {
    parsed = new URL(urlString);
  } catch {
    throw new Error(`Invalid URL: ${urlString}`);
  }

  if (!['http:', 'https:'].includes(parsed.protocol)) {
    throw new Error(
      `Blocked URL protocol: ${parsed.protocol} (only http/https allowed)`,
    );
  }

  if (BLOCKED_HOSTNAMES.has(parsed.hostname)) {
    throw new Error(`Blocked URL hostname: ${parsed.hostname}`);
  }

  if (isPrivateIp(parsed.hostname)) {
    throw new Error(`Blocked private IP address: ${parsed.hostname}`);
  }
}
