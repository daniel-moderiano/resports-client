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

  if (!youtubeChannels || !twitchChannels) {
    return null;
  }

  const combinedChannels = [
    ...youtubeChannels.map((channel) => ({
      key: channel.id,
      thumbnailUrl: channel.snippet.thumbnails.medium.url,
      title: channel.snippet.title,
      route: `${Routes.youtube.channel}/${channel.id}`,
      // No `isLive` property is available on YouTube channels, so we use `false` as a placeholder
      live: false,
    })),
    ...twitchChannels.map((channel) => ({
      key: channel.channelData.id,
      thumbnailUrl: channel.userData.profilePictureUrl,
      title: channel.channelData.displayName,
      route: `${Routes.twitch.channel}/${channel.channelData.id}`,
      live: channel.isLive,
    })),
  ];

  // Must sort AFTER combining to ensure the overall list is alphabetised
  const sortedChannels = combinedChannels.sort((a, b) =>
    a.title.toLowerCase().localeCompare(b.title.toLowerCase())
  );

  return (
    <>
      {youtubeChannels && twitchChannels && (
        <div>
          {sortedChannels.map((channel) => (
            <SavedChannelCard
              key={channel.key}
              thumbnailUrl={channel.thumbnailUrl}
              title={channel.title}
              route={channel.route}
              live={channel.live}
            />
          ))}
        </div>
      )}
    </>
  );
};
