export function createDisplayPostData(
  sourceId: string,
  overrides?: Record<string, any>,
) {
  return createPostData(sourceId, { isDisplay: true, ...overrides });
}

export function createPostData(
  sourceId: string,
  overrides?: Record<string, any>,
) {
  return {
    content: 'Test post content for integration testing',
    contentHash: 'testhash123',
    description: 'A test post description',
    isDisplay: false,
    originalAuthor: 'Test Author',
    originalPublishedAt: new Date('2025-01-15T10:00:00Z'),
    sourceId,
    sourceUrl: `https://example.com/post-${Date.now()}-${Math.random()}`,
    title: 'Test Post Title',
    ...overrides,
  };
}
