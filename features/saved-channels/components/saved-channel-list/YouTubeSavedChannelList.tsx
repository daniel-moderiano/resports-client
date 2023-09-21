import { Routes } from "config/routes";
import { SavedChannelCard } from "./SavedChannelCard";
import { toast } from "react-hot-toast";
import styles from "../styles/SidebarSavedChannelList.module.css";
import { LoadingSpinner } from "components/spinner";
import { useGetYouTubeChannels } from "features/channels/hooks/useGetYouTubeChannels";
import { YouTubeChannelSearchResult } from "types/youtubeAPITypes";

export const YouTubeSavedChannelList = ({
  channelIds,
  sortFn,
}: {
  channelIds: string[];
  sortFn?: (
    a: YouTubeChannelSearchResult,
    b: YouTubeChannelSearchResult
  ) => number;
}) => {
  const {
    data: channels,
    isLoading,
    isError,
  } = useGetYouTubeChannels(channelIds);

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <LoadingSpinner />
      </div>
    );
  }

  if (isError) {
    toast.error("Unable to get saved YouTube channels.");
  }

  if (!channels) {
    return null;
  }

  const channelsToRender = [...channels];

  if (sortFn) {
    channelsToRender.sort(sortFn);
  }

  return (
    <div>
      {channelsToRender.map((channel) => (
        <SavedChannelCard
          key={channel.id}
          thumbnailUrl={channel.snippet.thumbnails.medium.url}
          title={channel.snippet.title}
          route={`${Routes.youtube.channel}/${channel.id}`}
        />
      ))}
    </div>
  );
};
