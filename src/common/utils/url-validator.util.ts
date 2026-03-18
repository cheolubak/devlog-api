import { BadRequestException } from '@nestjs/common';
import { URL } from 'url';

const BLOCKED_HOSTNAMES = new Set([
  '0.0.0.0',
  '127.0.0.1',
  '[::1]',
  'localhost',
  'metadata.google.internal',
]);

/**
 * 외부 URL이 안전한지 검증합니다.
 * SSRF 방지를 위해 사설 IP, 로컬호스트, 클라우드 메타데이터 엔드포인트를 차단합니다.
 */
export function validateExternalUrl(urlString: string): void {
  let parsed: URL;
  try {
    parsed = new URL(urlString);
  } catch {
    throw new BadRequestException(`Invalid URL: ${urlString}`);
  }

  if (!['http:', 'https:'].includes(parsed.protocol)) {
    throw new BadRequestException(
      `Blocked URL protocol: ${parsed.protocol} (only http/https allowed)`,
    );
  }

  if (BLOCKED_HOSTNAMES.has(parsed.hostname)) {
    throw new BadRequestException(`Blocked URL hostname: ${parsed.hostname}`);
  }

  if (isPrivateIp(parsed.hostname)) {
    throw new BadRequestException(
      `Blocked private IP address: ${parsed.hostname}`,
    );
  }

  if (isPrivateIpv6(parsed.hostname)) {
    throw new BadRequestException(
      `Blocked private IPv6 address: ${parsed.hostname}`,
    );
  }
}

function expandIpv6(addr: string): null | number[] {
  // Handle IPv4-mapped suffix in dotted form
  if (addr.includes('.')) return null;

  const halves = addr.split('::');
  if (halves.length > 2) return null;

  const parseGroups = (s: string): number[] =>
    s ? s.split(':').map((g) => parseInt(g, 16)) : [];

  if (halves.length === 2) {
    const left = parseGroups(halves[0]);
    const right = parseGroups(halves[1]);
    const fill = 8 - left.length - right.length;
    if (fill < 0) return null;
    return [...left, ...Array(fill).fill(0), ...right];
  }

  const groups = parseGroups(addr);
  if (groups.length !== 8) return null;
  return groups;
}

/**
 * 사설 IPv4 대역인지 확인합니다.
 * 10.x.x.x, 172.16-31.x.x, 192.168.x.x, 169.254.x.x (link-local)
 */
function isPrivateIp(hostname: string): boolean {
  const parts = hostname.split('.').map(Number);
  if (parts.length !== 4 || parts.some((p) => isNaN(p))) return false;

  // 10.0.0.0/8
  if (parts[0] === 10) return true;
  // 127.0.0.0/8 (loopback)
  if (parts[0] === 127) return true;
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
 * 사설 IPv6 대역인지 확인합니다.
 * fc00::/7 (Unique Local), fe80::/10 (Link-local), ::ffff:x.x.x.x (IPv4-mapped)
 */
function isPrivateIpv6(hostname: string): boolean {
  // URL parser strips brackets from IPv6, but handle both cases
  const raw = hostname.replace(/^\[|\]$/g, '').toLowerCase();

  // IPv4-mapped IPv6 in dotted form (::ffff:127.0.0.1)
  const v4MappedDotted = raw.match(/^::ffff:(\d+\.\d+\.\d+\.\d+)$/);
  if (v4MappedDotted) {
    return isPrivateIp(v4MappedDotted[1]);
  }

  // Expand :: and parse hex groups
  const expanded = expandIpv6(raw);
  if (!expanded) return false;

  const firstGroup = expanded[0];
  // fc00::/7 — Unique Local Address
  if (firstGroup >= 0xfc00 && firstGroup <= 0xfdff) return true;
  // fe80::/10 — Link-local
  if (firstGroup >= 0xfe80 && firstGroup <= 0xfebf) return true;

  // IPv4-mapped IPv6 in hex form (::ffff:7f00:1 = 127.0.0.1)
  // Groups 0-4 are 0, group 5 is 0xffff, groups 6-7 are the IPv4 address
  if (
    expanded[0] === 0 &&
    expanded[1] === 0 &&
    expanded[2] === 0 &&
    expanded[3] === 0 &&
    expanded[4] === 0 &&
    expanded[5] === 0xffff
  ) {
    const ipv4 = `${(expanded[6] >> 8) & 0xff}.${expanded[6] & 0xff}.${(expanded[7] >> 8) & 0xff}.${expanded[7] & 0xff}`;
    return isPrivateIp(ipv4);
  }

  return false;
}
