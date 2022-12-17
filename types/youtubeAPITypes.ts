// * Use this file to declare any typings related to the YouTube API

// YouTube Snippet (a summary of the search result item)
export interface YouTubeSearchResultSnippet {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: {
    default: {
      url: string;
      width?: number;
      height?: number;
    };
    medium: {
      url: string;
      width?: number;
      height?: number;
    };
    high: {
      url: string;
      width?: number;
      height?: number;
    };
  };
  channelTitle: string;
  liveBroadcastContent: string;
  publishTime?: string;
}

// Individual search result items
export interface YouTubeSearchResult {
  kind: string;
  etag: string;
  id: {
    kind: string;
    videoId?: string;
    channelId?: string;
    playlistId?: string;
  };
  snippet: YouTubeSearchResultSnippet;
}

// Result returned by the general Search: list YouTube API method
export interface YouTubeSearchListResponse {
  kind: string;
  etag: string;
  nextPageToken?: string;
  prevPageToken?: string;
  regionCode: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
  items: YouTubeSearchResult[];
}

// Channel snippet forming part of the item returned by the Channel: list search method
export interface YouTubeChannelSearchResultSnippet {
  title: string;
  description: string;
  publishedAt: string;
  customUrl: string;
  thumbnails: {
    default: {
      url: string;
      width?: number;
      height?: number;
    };
    medium: {
      url: string;
      width?: number;
      height?: number;
    };
    high: {
      url: string;
      width?: number;
      height?: number;
    };
  };
  defaultLanguage?: string;
  country: string;
  localized: {
    title: string;
    description: string;
  };
}

// Describes an 'item' returned by the Channel: list search method
export interface YouTubeChannelSearchResult {
  kind: string;
  etag: string;
  id: string;
  snippet: YouTubeChannelSearchResultSnippet;
  statistics: {
    viewCount: string;
    subscriberCount: string;
    hiddenSubscriberCount: boolean;
    videoCount: string;
  };
  brandingSettings: {
    channel: {
      title: string;
      description: string;
      keywords?: string;
      trackingAnalyticsAccountId?: string;
      moderateComments?: boolean;
      unsubscribedTrailer?: string;
      defaultLanguage?: string;
      country: string;
    };
    watch?: {
      textColor: string;
      backgroundColor: string;
      featuredPlaylistId: string;
    };
    image: {
      bannerExternalUrl: string;
    };
  };
  contentDetails: {
    relatedPlaylists: {
      likes?: string;
      favorites?: string;
      uploads: string;
    };
  };
}

// Result returned by the Channel search: list YouTube API method
export interface YouTubeChannelSearchListResponse {
  kind: string;
  etag: string;
  nextPageToken?: string;
  prevPageToken?: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
  items: YouTubeChannelSearchResult[];
}

// PlaylistItem snippet forming part of the PlaylistItem search result
export interface YouTubePlaylistItemResultSnippet {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: {
    default: {
      url: string;
      width?: number;
      height?: number;
    };
    medium: {
      url: string;
      width?: number;
      height?: number;
    };
    high: {
      url: string;
      width?: number;
      height?: number;
    };
  };
  channelTitle: string;
  videoOwnerChannelTitle: string;
  videoOwnerChannelId: string;
  liveBroadcastContent: string;
  publishTime?: string;

  playlistId: string;
  position: number;
  resourceId: {
    kind: string;
    videoId: string;
  };
}

// Describes a 'playlistItem' returned by the PlaylistItem: list API method
export interface YouTubePlaylistItemResult {
  kind: string;
  etag: string;
  id: string;
  contentDetails: {
    videoId: string;
    videoPublishedAt: string;
    startAt?: string;
    endAt?: string;
    note?: string;
  };
  snippet: YouTubePlaylistItemResultSnippet;
}

// Result returned by the PlaylistItem: list YouTube API method
export interface YouTubePlaylistItemListResponse {
  kind: string;
  etag: string;
  nextPageToken?: string;
  prevPageToken?: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
  items: YouTubePlaylistItemResult[];
}

// Video item snippet forming part of the video: list API result
export interface YouTubeVideoResultSnippet {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: {
    default: {
      url: string;
      width?: number;
      height?: number;
    };
    medium: {
      url: string;
      width?: number;
      height?: number;
    };
    standard?: {
      url: string;
      width?: number;
      height?: number;
    };
    high: {
      url: string;
      width?: number;
      height?: number;
    };
    maxres?: {
      url: string;
      width?: number;
      height?: number;
    };
  };
  channelTitle: string;
  tags?: string[];
  categoryId: string;
  liveBroadcastContent: string;
  defaultAudioLanguage?: string;
  defaultLanguage?: string;
  localized?: {
    title: string;
    description: string;
  };
}

// Describes a video object returned by the Videos: list API method
export interface YouTubeVideoResult {
  kind: string;
  etag: string;
  id: string;
  snippet: YouTubeVideoResultSnippet;
  contentDetails: {
    duration: string;
    dimension: string;
    definition: string;
    caption: string;
    licensedContent: boolean;
    regionRestriction?: {
      allowed?: [string];
      blocked?: [string];
    };
    contentRating: {
      [key: string]: string;
    };
    projection: string;
    hasCustomThumbnail?: boolean;
  };
  statistics: {
    viewCount: string;
    likeCount: string;
    favoriteCount: string;
    commentCount: string;
    dislikeCount?: string;
  };
  player: {
    embedHtml: string;
    embedHeight?: number;
    embedWidth?: number;
  };
}

// Result returned by the Videos: list YouTube API method
export interface YouTubeVideoListResponse {
  kind: string;
  etag: string;
  nextPageToken?: string;
  prevPageToken?: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
  items: YouTubeVideoResult[];
}

export interface YouTubeVideoData {
  videoData: {
    kind: string;
    etag: string;
    id: string;
    snippet: YouTubeVideoResultSnippet;
    statistics: {
      viewCount: string;
      likeCount: string;
      favoriteCount: string;
      commentCount: string;
      dislikeCount?: string;
    };
  };
  channelData: {
    kind: string;
    etag: string;
    id: string;
    snippet: YouTubeChannelSearchResultSnippet;
    statistics: {
      viewCount: string;
      subscriberCount: string;
      hiddenSubscriberCount: boolean;
      videoCount: string;
    };
  };
}
