import { TwitchSavedChannelList } from "features/saved-channels/components/saved-channel-list/TwitchSavedChannelList";
import { YouTubeSavedChannelList } from "features/saved-channels/components/saved-channel-list/YouTubeSavedChannelList";
import TwitchNameIcon from "icons/TwitchNameIcon";
import YouTubeFullIcon from "icons/YouTubeFullIcon";
import React from "react";
import { useRecentlyViewedChannels } from "../hooks/useRecentlyViewedChannels";
import styles from "features/saved-channels/components/styles/SidebarSavedChannelList.module.css";
import { TwitchChannel } from "features/channels";
import { YouTubeChannelSearchResult } from "types/youtubeAPITypes";
import { Button } from "components/button";

export const RecentlyViewedChannels = () => {
  const { recentlyViewedChannels, clearRecentChannels } =
    useRecentlyViewedChannels();

  // Sorts an array of channels to 'match' a reference array (i.e. the recentlyViewedChannels order)
  const sortTwitchChannelsByReferenceArray = (
    a: TwitchChannel,
    b: TwitchChannel
  ) => {
    const indexA = recentlyViewedChannels.findIndex(
      (ref) => ref.channel_id === a.channelData.id
    );
    const indexB = recentlyViewedChannels.findIndex(
      (ref) => ref.channel_id === b.channelData.id
    );

    if (indexA === -1) return 1;
    if (indexB === -1) return -1;

    return indexA - indexB;
  };

  // Sorts an array of channels to 'match' a reference array (i.e. the recentlyViewedChannels order)
  const sortYouTubeChannelsByReferenceArray = (
    a: YouTubeChannelSearchResult,
    b: YouTubeChannelSearchResult
  ) => {
    const indexA = recentlyViewedChannels.findIndex(
      (ref) => ref.channel_id === a.id
    );
    const indexB = recentlyViewedChannels.findIndex(
      (ref) => ref.channel_id === b.id
    );

    if (indexA === -1) return 1;
    if (indexB === -1) return -1;

    return indexA - indexB;
  };

  if (recentlyViewedChannels.length === 0) {
    return <div>No recently viewed</div>;
  }

  const twitchChannelIds = recentlyViewedChannels.flatMap((channel) =>
    channel.platform === "twitch" ? [channel.channel_id] : []
  );
  const youtubeChannelIds = recentlyViewedChannels.flatMap((channel) =>
    channel.platform === "youtube" ? [channel.channel_id] : []
  );

  return (
    <div>
      <h2>Recently viewed channels</h2>
      <TwitchNameIcon fill="#9147FF" className={styles.twitchHeader} />
      <div className={styles.savedChannelList}>
        {twitchChannelIds.length > 0 ? (
          <TwitchSavedChannelList
            channelIds={twitchChannelIds}
            sortFn={sortTwitchChannelsByReferenceArray}
          />
        ) : (
          <p className={styles.subheader}>No recently viewed</p>
        )}
      </div>
      <YouTubeFullIcon className={styles.youtubeHeader} />
      <div className={styles.savedChannelList}>
        {youtubeChannelIds.length > 0 ? (
          <YouTubeSavedChannelList
            channelIds={youtubeChannelIds}
            sortFn={sortYouTubeChannelsByReferenceArray}
          />
        ) : (
          <p className={styles.subheader}>No recently viewed</p>
        )}
      </div>
      <Button onClick={clearRecentChannels}>Clear recently viewed</Button>
    </div>
  );
};
