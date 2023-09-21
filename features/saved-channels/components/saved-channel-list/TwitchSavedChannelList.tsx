import { Routes } from "config/routes";
import { useGetTwitchChannels } from "features/channels/hooks/useGetTwitchChannels";
import { SavedChannelCard } from "./SavedChannelCard";
import { toast } from "react-hot-toast";
import styles from "../styles/SidebarSavedChannelList.module.css";
import { LoadingSpinner } from "components/spinner";
import { TwitchChannel } from "features/channels";

export const TwitchSavedChannelList = ({
  channelIds,
  sortFn,
}: {
  channelIds: string[];
  sortFn?: (a: TwitchChannel, b: TwitchChannel) => number;
}) => {
  const {
    data: channels,
    isLoading,
    isError,
  } = useGetTwitchChannels(channelIds);

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <LoadingSpinner />
      </div>
    );
  }

  if (isError) {
    toast.error("Unable to get saved Twitch channels.");
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
          key={channel.channelData.id}
          thumbnailUrl={channel.userData.profilePictureUrl}
          title={channel.channelData.displayName}
          route={`${Routes.twitch.channel}/${channel.channelData.id}`}
          live={channel.isLive}
        />
      ))}
    </div>
  );
};
