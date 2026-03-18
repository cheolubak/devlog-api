import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

import {
  ApiProvider,
  ApiUsageService,
} from '../common/services/api-usage.service';
import { ParsedFeed } from './interfaces/feed-item.interface';

export interface FetchVideosOptions {
  cachedChannelId?: string;
  existingVideoUrls?: Set<string>;
  maxPages?: number;
}

export interface FetchVideosResult {
  channelId: string;
  feed: ParsedFeed;
}

interface YouTubeChannelResponse {
  items: {
    id: string;
    snippet: {
      customUrl?: string;
      title: string;
    };
  }[];
}

interface YouTubePlaylistItem {
  snippet: {
    channelId: string;
    channelTitle: string;
    description: string;
    publishedAt: string;
    resourceId: {
      kind: string;
      videoId: string;
    };
    thumbnails: {
      default: YouTubeThumbnail;
      high: YouTubeThumbnail;
      medium: YouTubeThumbnail;
    };
    title: string;
  };
}

interface YouTubePlaylistItemsResponse {
  items: YouTubePlaylistItem[];
  nextPageToken?: string;
  pageInfo: {
    resultsPerPage: number;
    totalResults: number;
  };
}

interface YouTubeSearchItem {
  id: {
    kind: string;
    videoId: string;
  };
  snippet: {
    channelId: string;
    channelTitle: string;
    description: string;
    publishedAt: string;
    thumbnails: {
      default: YouTubeThumbnail;
      high: YouTubeThumbnail;
      medium: YouTubeThumbnail;
    };
    title: string;
  };
}

interface YouTubeSearchResponse {
  items: YouTubeSearchItem[];
  nextPageToken?: string;
  pageInfo: {
    resultsPerPage: number;
    totalResults: number;
  };
}

interface YouTubeThumbnail {
  height: number;
  url: string;
  width: number;
}

interface YouTubeVideoDetail {
  contentDetails: {
    duration: string;
  };
  id: string;
}

interface YouTubeVideoListResponse {
  items: YouTubeVideoDetail[];
}

@Injectable()
export class YoutubeFetcherService {
  private readonly apiKey: string;
  private readonly baseUrl = 'https://www.googleapis.com/youtube/v3';
  private readonly logger = new Logger(YoutubeFetcherService.name);

  constructor(
    private readonly apiUsageService: ApiUsageService,
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.apiKey = this.configService.get<string>('YOUTUBE_API_KEY') || '';
  }

  async fetchVideos(
    channelUrl: string,
    options?: FetchVideosOptions,
  ): Promise<FetchVideosResult> {
    if (!this.apiKey) {
      throw new Error('YOUTUBE_API_KEY is not configured');
    }

    if (!this.apiUsageService.canUse(ApiProvider.YOUTUBE)) {
      const usage = this.apiUsageService.getUsage(ApiProvider.YOUTUBE);
      this.logger.warn(
        `YouTube API daily limit reached (${usage.count}/${usage.limit}), skipping fetch for ${channelUrl}`,
      );
      return {
        channelId: options?.cachedChannelId || '',
        feed: {
          description: 'YouTube channel videos',
          items: [],
          link: channelUrl,
          title: 'YouTube Channel',
        },
      };
    }

    const channelId =
      options?.cachedChannelId || (await this.extractChannelId(channelUrl));

    const allItems = await this.listUploadedVideos(
      channelId,
      options?.maxPages ?? 3,
      options?.existingVideoUrls,
    );

    // Filter out already-existing videos before calling filterOutShorts
    let newItems = allItems;
    if (options?.existingVideoUrls?.size) {
      newItems = newItems.filter(
        (item) =>
          !options.existingVideoUrls!.has(
            `https://www.youtube.com/watch?v=${item.snippet.resourceId.videoId}`,
          ),
      );
    }

    // Only call filterOutShorts if there are new videos
    const filteredItems =
      newItems.length > 0 ? await this.filterOutShorts(newItems) : [];

    const items = filteredItems.map((item) => ({
      content: item.snippet.description,
      contentSnippet: this.truncateDescription(item.snippet.description, 300),
      creator: item.snippet.channelTitle,
      guid: item.snippet.resourceId.videoId,
      imageUrl: this.getBestThumbnail(item.snippet.thumbnails),
      isoDate: item.snippet.publishedAt,
      link: `https://www.youtube.com/watch?v=${item.snippet.resourceId.videoId}`,
      rawData: item,
      title: item.snippet.title,
    }));

    return {
      channelId,
      feed: {
        description: `YouTube channel videos`,
        items,
        link: channelUrl,
        title: filteredItems[0]?.snippet.channelTitle || 'YouTube Channel',
      },
    };
  }

  private async extractChannelId(url: string): Promise<string> {
    // Decode percent-encoded URLs (e.g. Korean handles like /@%ED%8F%AC...)
    try {
      url = decodeURIComponent(url);
    } catch {
      // If decoding fails, use the original URL
    }

    const channelIdMatch = url.match(/\/channel\/(UC[\w-]+)/);
    if (channelIdMatch) {
      return channelIdMatch[1];
    }

    const handleMatch = url.match(/\/@([^/?&#]+)/);
    if (handleMatch) {
      return this.resolveHandleToChannelId(handleMatch[1]);
    }

    const customUrlMatch = url.match(/\/c\/([\w-]+)/);
    if (customUrlMatch) {
      return this.resolveCustomUrlToChannelId(customUrlMatch[1]);
    }

    const userMatch = url.match(/\/user\/([\w-]+)/);
    if (userMatch) {
      return this.resolveUsernameToChannelId(userMatch[1]);
    }

    throw new Error(`Unable to extract channel ID from URL: ${url}`);
  }

  private async resolveHandleToChannelId(handle: string): Promise<string> {
    const channelsUrl = `${this.baseUrl}/channels`;
    const params = {
      forHandle: `@${handle}`,
      key: this.apiKey,
      part: 'id',
    };

    const response = await firstValueFrom(
      this.httpService.get<YouTubeChannelResponse>(channelsUrl, { params }),
    );
    this.apiUsageService.record(ApiProvider.YOUTUBE);

    if (response.data.items.length === 0) {
      throw new Error(`Channel not found for handle: @${handle}`);
    }

    return response.data.items[0].id;
  }

  private async resolveCustomUrlToChannelId(
    customUrl: string,
  ): Promise<string> {
    // Try channels API with forHandle first (1 unit)
    try {
      const channelsUrl = `${this.baseUrl}/channels`;
      const params = {
        forHandle: `@${customUrl}`,
        key: this.apiKey,
        part: 'id',
      };

      const response = await firstValueFrom(
        this.httpService.get<YouTubeChannelResponse>(channelsUrl, { params }),
      );
      this.apiUsageService.record(ApiProvider.YOUTUBE);

      if (response.data.items.length > 0) {
        return response.data.items[0].id;
      }
    } catch {
      // Fall back to search API
    }

    // Fallback to search API (100 units)
    const searchUrl = `${this.baseUrl}/search`;
    const searchParams = {
      key: this.apiKey,
      maxResults: '1',
      part: 'snippet',
      q: customUrl,
      type: 'channel',
    };

    const response = await firstValueFrom(
      this.httpService.get<YouTubeSearchResponse>(searchUrl, {
        params: searchParams,
      }),
    );
    this.apiUsageService.record(ApiProvider.YOUTUBE);

    if (response.data.items.length === 0) {
      throw new Error(`Channel not found for custom URL: ${customUrl}`);
    }

    return response.data.items[0].snippet.channelId;
  }

  private async resolveUsernameToChannelId(username: string): Promise<string> {
    const channelsUrl = `${this.baseUrl}/channels`;
    const params = {
      forUsername: username,
      key: this.apiKey,
      part: 'id',
    };

    const response = await firstValueFrom(
      this.httpService.get<YouTubeChannelResponse>(channelsUrl, { params }),
    );
    this.apiUsageService.record(ApiProvider.YOUTUBE);

    if (response.data.items.length === 0) {
      throw new Error(`Channel not found for username: ${username}`);
    }

    return response.data.items[0].id;
  }

  private async listUploadedVideos(
    channelId: string,
    maxPages: number = 20,
    existingVideoUrls?: Set<string>,
  ): Promise<YouTubePlaylistItem[]> {
    const uploadsPlaylistId = 'UU' + channelId.substring(2);
    const playlistItemsUrl = `${this.baseUrl}/playlistItems`;
    const allItems: YouTubePlaylistItem[] = [];
    let pageToken: string | undefined;
    let currentPage = 0;
    let foundExisting = false;

    do {
      const params: Record<string, string> = {
        key: this.apiKey,
        maxResults: '50',
        order: 'date',
        part: 'snippet',
        playlistId: uploadsPlaylistId,
      };

      if (pageToken) params.pageToken = pageToken;

      const response = await firstValueFrom(
        this.httpService.get<YouTubePlaylistItemsResponse>(playlistItemsUrl, {
          params,
        }),
      );
      this.apiUsageService.record(ApiProvider.YOUTUBE);

      for (const item of response.data.items) {
        const videoUrl = `https://www.youtube.com/watch?v=${item.snippet.resourceId.videoId}`;
        if (existingVideoUrls?.has(videoUrl)) {
          foundExisting = true;
          break;
        }
        allItems.push(item);
      }

      pageToken = response.data.nextPageToken;
      currentPage++;
    } while (pageToken && currentPage < maxPages && !foundExisting);

    return allItems;
  }

  private async filterOutShorts(
    items: YouTubePlaylistItem[],
  ): Promise<YouTubePlaylistItem[]> {
    if (items.length === 0) return items;

    const BATCH_SIZE = 50;
    const shortsIds = new Set<string>();
    const videosUrl = `${this.baseUrl}/videos`;

    for (let i = 0; i < items.length; i += BATCH_SIZE) {
      const batch = items.slice(i, i + BATCH_SIZE);
      const videoIds = batch
        .map((item) => item.snippet.resourceId.videoId)
        .join(',');
      const params = {
        id: videoIds,
        key: this.apiKey,
        part: 'contentDetails',
      };

      const response = await firstValueFrom(
        this.httpService.get<YouTubeVideoListResponse>(videosUrl, { params }),
      );
      this.apiUsageService.record(ApiProvider.YOUTUBE);

      for (const video of response.data.items) {
        if (this.parseDuration(video.contentDetails.duration) <= 60) {
          shortsIds.add(video.id);
        }
      }
    }

    const filtered = items.filter(
      (item) => !shortsIds.has(item.snippet.resourceId.videoId),
    );
    this.logger.log(
      `Filtered out ${items.length - filtered.length} Shorts from ${items.length} videos`,
    );

    return filtered;
  }

  private parseDuration(duration: string): number {
    const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
    if (!match) return 0;
    const hours = parseInt(match[1] || '0', 10);
    const minutes = parseInt(match[2] || '0', 10);
    const seconds = parseInt(match[3] || '0', 10);
    return hours * 3600 + minutes * 60 + seconds;
  }

  private getBestThumbnail(
    thumbnails: YouTubePlaylistItem['snippet']['thumbnails'],
  ): string {
    return (
      thumbnails.high?.url || thumbnails.medium?.url || thumbnails.default?.url
    );
  }

  private truncateDescription(description: string, maxLength: number): string {
    if (description.length <= maxLength) {
      return description;
    }
    return description.substring(0, maxLength - 3) + '...';
  }
}
