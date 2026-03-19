/**
 * Processes items in parallel chunks with a configurable concurrency limit.
 * Uses Promise.allSettled so that individual failures do not abort the chunk.
 * Returns the fulfilled results in order; rejected items are skipped.
 */
export async function processInChunks<T, R>(
  items: T[],
  fn: (item: T) => Promise<R>,
  concurrency = 5,
): Promise<R[]> {
  const results: R[] = [];

  for (let i = 0; i < items.length; i += concurrency) {
    const chunk = items.slice(i, i + concurrency);
    const settled = await Promise.allSettled(chunk.map(fn));

    for (const result of settled) {
      if (result.status === 'fulfilled') {
        results.push(result.value);
      }
    }
  }

  return results;
}
