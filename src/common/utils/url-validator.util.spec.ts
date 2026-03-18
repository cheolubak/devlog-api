import { validateExternalUrl } from './url-validator.util';

describe('validateExternalUrl', () => {
  describe('valid external URLs', () => {
    it('should accept https URLs', () => {
      expect(() => validateExternalUrl('https://example.com')).not.toThrow();
    });

    it('should accept http URLs', () => {
      expect(() => validateExternalUrl('http://example.com')).not.toThrow();
    });

    it('should accept URLs with paths', () => {
      expect(() =>
        validateExternalUrl('https://example.com/blog/post-1'),
      ).not.toThrow();
    });

    it('should accept URLs with query parameters', () => {
      expect(() =>
        validateExternalUrl('https://example.com/search?q=test'),
      ).not.toThrow();
    });
  });

  describe('blocked localhost URLs', () => {
    it('should block http://localhost', () => {
      expect(() => validateExternalUrl('http://localhost')).toThrow(
        'Blocked URL hostname: localhost',
      );
    });

    it('should block http://127.0.0.1', () => {
      expect(() => validateExternalUrl('http://127.0.0.1')).toThrow(
        'Blocked URL hostname: 127.0.0.1',
      );
    });

    it('should block http://0.0.0.0', () => {
      expect(() => validateExternalUrl('http://0.0.0.0')).toThrow(
        'Blocked URL hostname: 0.0.0.0',
      );
    });

    it('should block IPv6 loopback [::1]', () => {
      expect(() => validateExternalUrl('http://[::1]')).toThrow(
        'Blocked URL hostname: [::1]',
      );
    });
  });

  describe('blocked private IPs', () => {
    it('should block 10.x.x.x range', () => {
      expect(() => validateExternalUrl('http://10.0.0.1')).toThrow(
        'Blocked private IP address: 10.0.0.1',
      );
    });

    it('should block 172.16.x.x range', () => {
      expect(() => validateExternalUrl('http://172.16.0.1')).toThrow(
        'Blocked private IP address: 172.16.0.1',
      );
    });

    it('should block 172.31.x.x range', () => {
      expect(() => validateExternalUrl('http://172.31.255.255')).toThrow(
        'Blocked private IP address: 172.31.255.255',
      );
    });

    it('should block 192.168.x.x range', () => {
      expect(() => validateExternalUrl('http://192.168.1.1')).toThrow(
        'Blocked private IP address: 192.168.1.1',
      );
    });
  });

  describe('blocked metadata endpoints', () => {
    it('should block AWS metadata endpoint 169.254.169.254', () => {
      expect(() => validateExternalUrl('http://169.254.169.254')).toThrow(
        'Blocked private IP address: 169.254.169.254',
      );
    });

    it('should block Google Cloud metadata hostname', () => {
      expect(() =>
        validateExternalUrl('http://metadata.google.internal'),
      ).toThrow('Blocked URL hostname: metadata.google.internal');
    });

    it('should block link-local range 169.254.x.x', () => {
      expect(() => validateExternalUrl('http://169.254.0.1')).toThrow(
        'Blocked private IP address: 169.254.0.1',
      );
    });
  });

  describe('invalid protocols', () => {
    it('should block ftp:// protocol', () => {
      expect(() => validateExternalUrl('ftp://example.com')).toThrow(
        'Blocked URL protocol: ftp:',
      );
    });

    it('should block file:// protocol', () => {
      expect(() => validateExternalUrl('file:///etc/passwd')).toThrow(
        'Blocked URL protocol: file:',
      );
    });
  });

  describe('invalid URLs', () => {
    it('should reject completely invalid URLs', () => {
      expect(() => validateExternalUrl('not-a-url')).toThrow('Invalid URL');
    });

    it('should reject empty strings', () => {
      expect(() => validateExternalUrl('')).toThrow('Invalid URL');
    });
  });
});
