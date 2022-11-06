import { HelixChannel, HelixUser } from "@twurple/api/lib";

export interface TwitchChannel {
  channelData: HelixChannel;
  userData: HelixUser;
  isLive?: boolean;
}

export interface VideoFilters {
  dateFilter: Date;
  minDurationFilter: number;
  maxDurationFilter: number;
  keywordFilter: string;
}
