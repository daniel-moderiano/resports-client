import {
  useAddSavedChannel,
  useGetSavedChannels,
} from "features/saved-channels/api/useSavedChannels";

type SavedChannelsListProps = {
  userId: string;
};

export const SavedChannelsList = ({ userId }: SavedChannelsListProps) => {
  const { data, isLoading, error } = useGetSavedChannels(userId);
  const { mutate } = useAddSavedChannel(userId);

  if (error) {
    console.error(error);
    return (
      <div>
        <p>Oops! Something went wrong while loading your channels.</p>
        <p>Please try again later.</p>
      </div>
    );
  }

  if (isLoading) {
    return <div>Loading your channels...</div>;
  }

  if (!data || data.length === 0) {
    return (
      <div>
        <button
          onClick={() => {
            mutate({
              channel_id: "5678",
              platform: "twitch",
            });
          }}
        >
          Add saved channel
        </button>
        No channels found.
      </div>
    );
  }

  return (
    <div>
      <button
        onClick={() => {
          mutate({
            channel_id: "1234",
            platform: "twitch",
          });
        }}
      >
        Add saved channel
      </button>
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
