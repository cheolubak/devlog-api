import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

import { ParsedFeed } from './interfaces/feed-item.interface';

interface YouTubeChannelResponse {
  items: {
    id: string;
    snippet: {
      customUrl?: string;
      title: string;
    };
  }[];
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
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.apiKey = this.configService.get<string>('YOUTUBE_API_KEY') || '';
  }

  async fetchVideos(channelUrl: string): Promise<ParsedFeed> {
    if (!this.apiKey) {
      throw new Error('YOUTUBE_API_KEY is not configured');
    }

    const channelId = await this.extractChannelId(channelUrl);
    this.logger.log(`Fetching videos for channel: ${channelId}`);

    const response = await this.searchVideos(channelId);
    const filteredItems = await this.filterOutShorts(response.items);

    const items = filteredItems.map((item) => ({
      content: item.snippet.description,
      contentSnippet: this.truncateDescription(item.snippet.description, 300),
      creator: item.snippet.channelTitle,
      guid: item.id.videoId,
      imageUrl: this.getBestThumbnail(item.snippet.thumbnails),
      isoDate: item.snippet.publishedAt,
      link: `https://www.youtube.com/watch?v=${item.id.videoId}`,
      rawData: item,
      title: item.snippet.title,
    }));

    return {
      description: `YouTube channel videos`,
      items,
      link: channelUrl,
      title: filteredItems[0]?.snippet.channelTitle || 'YouTube Channel',
    };
  }

  private async extractChannelId(url: string): Promise<string> {
    const channelIdMatch = url.match(/\/channel\/(UC[\w-]+)/);
    if (channelIdMatch) {
      return channelIdMatch[1];
    }

    const handleMatch = url.match(/\/@([\w-]+)/);
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
    this.logger.debug(`Resolving handle @${handle} to channel ID`);

    const searchUrl = `${this.baseUrl}/search`;
    const params = {
      key: this.apiKey,
      maxResults: '1',
      part: 'snippet',
      q: `@${handle}`,
      type: 'channel',
    };

    const response = await firstValueFrom(
      this.httpService.get<YouTubeSearchResponse>(searchUrl, { params }),
    );

    if (response.data.items.length === 0) {
      throw new Error(`Channel not found for handle: @${handle}`);
    }

    const channelId = response.data.items[0].snippet.channelId;
    this.logger.debug(`Resolved @${handle} to channel ID: ${channelId}`);
    return channelId;
  }

  private async resolveCustomUrlToChannelId(
    customUrl: string,
  ): Promise<string> {
    this.logger.debug(`Resolving custom URL ${customUrl} to channel ID`);

    const searchUrl = `${this.baseUrl}/search`;
    const params = {
      key: this.apiKey,
      maxResults: '1',
      part: 'snippet',
      q: customUrl,
      type: 'channel',
    };

    const response = await firstValueFrom(
      this.httpService.get<YouTubeSearchResponse>(searchUrl, { params }),
    );

    if (response.data.items.length === 0) {
      throw new Error(`Channel not found for custom URL: ${customUrl}`);
    }

    const channelId = response.data.items[0].snippet.channelId;
    this.logger.debug(`Resolved ${customUrl} to channel ID: ${channelId}`);
    return channelId;
  }

  private async resolveUsernameToChannelId(username: string): Promise<string> {
    this.logger.debug(`Resolving username ${username} to channel ID`);

    const channelsUrl = `${this.baseUrl}/channels`;
    const params = {
      forUsername: username,
      key: this.apiKey,
      part: 'id',
    };

    const response = await firstValueFrom(
      this.httpService.get<YouTubeChannelResponse>(channelsUrl, { params }),
    );

    if (response.data.items.length === 0) {
      throw new Error(`Channel not found for username: ${username}`);
    }

    const channelId = response.data.items[0].id;
    this.logger.debug(`Resolved ${username} to channel ID: ${channelId}`);
    return channelId;
  }

  private async searchVideos(
    channelId: string,
  ): Promise<YouTubeSearchResponse> {
    const searchUrl = `${this.baseUrl}/search`;
    const params = {
      channelId,
      key: this.apiKey,
      maxResults: '50',
      order: 'date',
      part: 'snippet',
      type: 'video',
    };

    const response = await firstValueFrom(
      this.httpService.get<YouTubeSearchResponse>(searchUrl, { params }),
    );

    this.logger.log(
      `Fetched ${response.data.items.length} videos from channel ${channelId}`,
    );

    return response.data;
  }

  private async filterOutShorts(
    items: YouTubeSearchItem[],
  ): Promise<YouTubeSearchItem[]> {
    if (items.length === 0) return items;

    const videoIds = items.map((item) => item.id.videoId).join(',');
    const videosUrl = `${this.baseUrl}/videos`;
    const params = {
      id: videoIds,
      key: this.apiKey,
      part: 'contentDetails',
    };

    const response = await firstValueFrom(
      this.httpService.get<YouTubeVideoListResponse>(videosUrl, { params }),
    );

    const shortsIds = new Set(
      response.data.items
        .filter(
          (video) => this.parseDuration(video.contentDetails.duration) <= 60,
        )
        .map((video) => video.id),
    );

    const filtered = items.filter((item) => !shortsIds.has(item.id.videoId));
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
    thumbnails: YouTubeSearchItem['snippet']['thumbnails'],
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
