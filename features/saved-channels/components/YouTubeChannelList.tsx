import { Routes } from "config/routes";
import { useGetYouTubeChannels } from "features/channels/hooks/useGetYouTubeChannels";
import { ChannelCard } from "features/search/components/ChannelCard";
import { useEffect } from "react";

export const YouTubeChannelList = ({
  channelIds,
}: {
  channelIds: string[];
}) => {
  const { data: channels } = useGetYouTubeChannels(channelIds);

  return (
    <>
      {channels && (
        <div>
          {channels.map((channel) => (
            <ChannelCard
              key={channel.id}
              thumbnailUrl={channel.snippet.thumbnails.medium.url}
              title={channel.snippet.title}
              description={channel.snippet.description}
              route={`${Routes.youtube.channel}/${channel.id}`}
            />
          ))}
        </div>
      )}
    </>
  );
};
