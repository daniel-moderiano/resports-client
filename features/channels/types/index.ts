import { HelixChannel, HelixUser, HelixVideo } from "@twurple/api/lib";

export interface TwitchChannel {
  channelData: HelixChannel;
  userData: HelixUser;
  isLive?: boolean;
}

export interface TwitchVideo {
  videoData: HelixVideo;
  userData: HelixUser;
}

export interface VideoFilters {
  dateFilter: Date;
  minDurationFilter: number;
  maxDurationFilter: number;
  keywordFilter: string;
}
