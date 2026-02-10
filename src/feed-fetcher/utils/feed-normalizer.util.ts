export class FeedNormalizerUtil {
  static stripHtml(html: string): string {
    if (!html) return '';
    return html
      .replace(/<[^>]*>/g, '')
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#039;/g, "'")
      .trim();
  }

  static extractFirstImage(html: string): string | null {
    if (!html) return null;

    const imgRegex = /<img[^>]+src="([^">]+)"/i;
    const match = html.match(imgRegex);

    if (match && match[1]) {
      return match[1];
    }

    return null;
  }

  static truncateText(text: string, maxLength: number): string {
    if (!text || text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + '...';
  }

  static normalizeTag(tag: string): string {
    return tag
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9가-힣\s-]/g, '')
      .replace(/\s+/g, '-')
      .substring(0, 50);
  }

  static extractDescription(content: string, contentSnippet: string): string {
    const text = contentSnippet || this.stripHtml(content);
    return this.truncateText(text, 500);
  }
}
