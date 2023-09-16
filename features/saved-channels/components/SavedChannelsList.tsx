import { Button } from "components/button";
import { LoadingSpinner } from "components/spinner";
import {
  useAddSavedChannel,
  useDeleteSavedChannel,
  useGetSavedChannels,
} from "features/saved-channels/api/useSavedChannels";
import { toast } from "react-hot-toast";
import { TwitchChannelList } from "./TwitchChannelList";
import { YouTubeChannelList } from "./YouTubeChannelList";

export const SavedChannelsList = () => {
  const {
    data,
    isLoading: isSavedChannelsLoading,
    error,
  } = useGetSavedChannels();
  const { mutate: addChannel, isLoading: isAddSavedChannelLoading } =
    useAddSavedChannel();
  const { mutate: deleteChannel, isLoading: isDeleteChannelLoading } =
    useDeleteSavedChannel();

  if (error) {
    console.error(error);
    return (
      <div>
        <p>Oops! Something went wrong while loading your channels.</p>
        <p>Please try again later.</p>
      </div>
    );
  }

  if (isSavedChannelsLoading) {
    return <div>Loading your channels...</div>;
  }

  if (!data || data.length === 0) {
    return (
      <div>
        <Button
          onClick={() => {
            toast.success("You've successfully added a channel!");
            addChannel({
              channel_id: "5678",
              platform: "twitch",
            });
          }}
          disabled={isAddSavedChannelLoading}
        >
          {isAddSavedChannelLoading && <LoadingSpinner />}
          Add saved channel
        </Button>
        <Button
          variant="secondary"
          onClick={() => {
            deleteChannel("1234");
          }}
          disabled={isDeleteChannelLoading}
        >
          {isDeleteChannelLoading && <LoadingSpinner />}
          Delete channel
        </Button>
        No channels found.
      </div>
    );
  }

  return (
    <div>
      <YouTubeChannelList
        channelIds={data.flatMap((channel) => {
          if (channel.platform === "youtube") {
            return [channel.channel_id];
          } else {
            return [];
          }
        })}
      />
      <TwitchChannelList
        channelIds={data.flatMap((channel) => {
          if (channel.platform === "twitch") {
            return [channel.channel_id];
          } else {
            return [];
          }
        })}
      />
      <Button
        onClick={() => {
          toast.success("You've successfully added a channel!");
          addChannel({
            channel_id: "1234",
            platform: "twitch",
          });
        }}
        disabled={isAddSavedChannelLoading}
      >
        {isAddSavedChannelLoading && <LoadingSpinner />}
        Add saved channel
      </Button>
      <Button
        variant="secondary"
        onClick={() => {
          deleteChannel("1234");
        }}
        disabled={isDeleteChannelLoading}
      >
        {isDeleteChannelLoading && <LoadingSpinner />}
        Delete channel
      </Button>
      <ul>
        {data.map((channel) => (
          <li key={channel.channel_id}>
            {channel.channel_id} - {channel.platform}
          </li>
        ))}
      </ul>
    </div>
  );
};
