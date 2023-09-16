import { LoadingSpinner } from "components/spinner";
import { useGetSavedChannels } from "features/saved-channels/api/useSavedChannels";
import { toast } from "react-hot-toast";
import { CombinedChannelList } from "./CombinedChannelList";
import styles from "../styles/SidebarSavedChannelList.module.css";

export const SidebarSavedChannelsList = () => {
  const {
    data: savedChannels,
    isLoading: isSavedChannelsLoading,
    isError: isSavedChannelsError,
  } = useGetSavedChannels();

  if (isSavedChannelsError) {
    toast.error("Error: Unable to get saved channels.");
  }

  if (isSavedChannelsLoading) {
    return (
      <div className={styles.loading}>
        <LoadingSpinner />
      </div>
    );
  }

  if (!savedChannels) {
    return null;
  }

  const twitchChannelIds = savedChannels.flatMap((channel) =>
    channel.platform === "twitch" ? [channel.channel_id] : []
  );
  const youtubeChannelIds = savedChannels.flatMap((channel) =>
    channel.platform === "youtube" ? [channel.channel_id] : []
  );

  return (
    <CombinedChannelList
      youtubeChannelIds={youtubeChannelIds}
      twitchChannelIds={twitchChannelIds}
    />
  );
};
