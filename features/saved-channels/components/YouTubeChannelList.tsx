import { Routes } from "config/routes";
import { useGetYouTubeChannels } from "features/channels/hooks/useGetYouTubeChannels";
import { SavedChannelCard } from "./SavedChannelCard";

export const YouTubeChannelList = ({
  channelIds,
}: {
  channelIds: string[];
}) => {
  const { data: channels } = useGetYouTubeChannels(channelIds);

  return (
    <>
      <h3>YouTube channels</h3>
      {channels && (
        <div>
          {channels
            .sort((a, b) => a.snippet.title.localeCompare(b.snippet.title))
            .map((channel) => (
              <SavedChannelCard
                key={channel.id}
                thumbnailUrl={channel.snippet.thumbnails.medium.url}
                title={channel.snippet.title}
                route={`${Routes.youtube.channel}/${channel.id}`}
                channelId={channel.id}
                platform="youtube"
              />
            ))}
        </div>
      )}
    </>
  );
};
