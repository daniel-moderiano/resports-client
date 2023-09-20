import { LoadingSpinner } from "components/spinner";
import { useGetSavedChannels } from "features/saved-channels/api/useSavedChannels";
import { toast } from "react-hot-toast";
import styles from "../styles/SidebarSavedChannelList.module.css";
import { YouTubeSavedChannelList } from "./YouTubeSavedChannelList";
import { TwitchSavedChannelList } from "./TwitchSavedChannelList";
import TwitchNameIcon from "icons/TwitchNameIcon";
import YouTubeFullIcon from "icons/YouTubeFullIcon";

export const SidebarSavedChannelsList = ({
  closeSidebar,
}: {
  closeSidebar: () => void;
}) => {
  const {
    data: savedChannels,
    isLoading: isSavedChannelsLoading,
    isError: isSavedChannelsError,
  } = useGetSavedChannels();

  if (isSavedChannelsError) {
    toast.error("Unable to get saved channels.");
  }

  if (isSavedChannelsLoading) {
    return (
      <div>
        <TwitchNameIcon fill="#9147FF" className={styles.twitchHeader} />
        <div className={styles.loading}>
          <LoadingSpinner />
        </div>
        <YouTubeFullIcon className={styles.youtubeHeader} />
        <div className={styles.loading}>
          <LoadingSpinner />
        </div>
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
    <div>
      <TwitchNameIcon fill="#9147FF" className={styles.twitchHeader} />
      <div className={styles.savedChannelList} onClick={closeSidebar}>
        {twitchChannelIds.length > 0 ? (
          <TwitchSavedChannelList channelIds={twitchChannelIds} />
        ) : (
          <p className={styles.subheader}>No saved channels</p>
        )}
      </div>
      <YouTubeFullIcon className={styles.youtubeHeader} />
      <div className={styles.savedChannelList} onClick={closeSidebar}>
        {youtubeChannelIds.length > 0 ? (
          <YouTubeSavedChannelList channelIds={youtubeChannelIds} />
        ) : (
          <p className={styles.subheader}>No saved channels</p>
        )}
      </div>
    </div>
  );
};
