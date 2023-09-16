import { Routes } from "config/routes";
import { useGetTwitchChannels } from "features/channels/hooks/useGetTwitchChannels";
import { SavedChannelCard } from "./SavedChannelCard";

export const TwitchChannelList = ({ channelIds }: { channelIds: string[] }) => {
  const {
    data: channels,
    isLoading,
    isError,
  } = useGetTwitchChannels(channelIds);

  return (
    <>
      <h3>Twitch channels</h3>
      {isLoading && "Loading..."}
      {isError && "Error..."}
      {channels && (
        <div>
          {channels.map((channel) => (
            <SavedChannelCard
              key={channel.channelData.id}
              thumbnailUrl={channel.userData.profilePictureUrl}
              title={channel.channelData.displayName}
              route={`${Routes.twitch.channel}/${channel.channelData.id}`}
              live={channel.isLive}
              channelId={channel.channelData.id}
              platform="twitch"
            />
          ))}
        </div>
      )}
    </>
  );
};
