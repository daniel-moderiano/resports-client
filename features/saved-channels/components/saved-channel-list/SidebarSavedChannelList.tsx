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
          // Sort alphabetically
          <TwitchSavedChannelList
            channelIds={twitchChannelIds}
            sortFn={(a, b) =>
              a.channelData.displayName
                .toLowerCase()
                .localeCompare(b.channelData.displayName.toLowerCase())
            }
          />
        ) : (
          <p className={styles.subheader}>No saved channels</p>
        )}
      </div>
      <YouTubeFullIcon className={styles.youtubeHeader} />
      <div className={styles.savedChannelList} onClick={closeSidebar}>
        {youtubeChannelIds.length > 0 ? (
          // Sort alphabetically
          <YouTubeSavedChannelList
            channelIds={youtubeChannelIds}
            sortFn={(a, b) =>
              a.snippet.title
                .toLowerCase()
                .localeCompare(b.snippet.title.toLowerCase())
            }
          />
        ) : (
          <p className={styles.subheader}>No saved channels</p>
        )}
      </div>
    </div>
  );
};
