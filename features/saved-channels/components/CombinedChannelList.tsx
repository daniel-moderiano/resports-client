import { Routes } from "config/routes";
import { useGetYouTubeChannels } from "features/channels/hooks/useGetYouTubeChannels";
import { useGetTwitchChannels } from "features/channels/hooks/useGetTwitchChannels";
import { SavedChannelCard } from "./SavedChannelCard";
import { toast } from "react-hot-toast";

export const CombinedChannelList = ({
  youtubeChannelIds,
  twitchChannelIds,
}: {
  youtubeChannelIds: string[];
  twitchChannelIds: string[];
}) => {
  const {
    data: youtubeChannels,
    isLoading: youtubeLoading,
    isError: youtubeError,
  } = useGetYouTubeChannels(youtubeChannelIds);
  const {
    data: twitchChannels,
    isLoading: twitchLoading,
    isError: twitchError,
  } = useGetTwitchChannels(twitchChannelIds);

  if (youtubeLoading || twitchLoading) {
    return <div>Loading...</div>;
  }

  if (youtubeError || twitchError) {
    toast.error("Error: Unable to get saved channels.");
  }

  return (
    <>
      {youtubeChannels && twitchChannels && (
        <div>
          {youtubeChannels.map((channel) => (
            <SavedChannelCard
              key={channel.id}
              thumbnailUrl={channel.snippet.thumbnails.medium.url}
              title={channel.snippet.title}
              route={`${Routes.youtube.channel}/${channel.id}`}
            />
          ))}
          {twitchChannels.map((channel) => (
            <SavedChannelCard
              key={channel.channelData.id}
              thumbnailUrl={channel.userData.profilePictureUrl}
              title={channel.channelData.displayName}
              route={`${Routes.twitch.channel}/${channel.channelData.id}`}
              live={channel.isLive}
            />
          ))}
        </div>
      )}
    </>
  );
};
