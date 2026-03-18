export class PostDisplayUpdatedEvent {
  constructor(
    public readonly postId: string,
    public readonly title: string,
    public readonly description: null | string,
    public readonly titleEn: null | string,
    public readonly sourceUrl: null | string,
    public readonly region: null | string,
  ) {}
}
