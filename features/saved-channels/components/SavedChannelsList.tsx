import { useGetSavedChannels } from "features/saved-channels/api/useSavedChannels";

type SavedChannelsListProps = {
  userId: string;
};

export const SavedChannelsList = ({ userId }: SavedChannelsListProps) => {
  const { data, isLoading, error } = useGetSavedChannels(userId);

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
    return <div>No channels found.</div>;
  }

  return (
    <ul>
      {data.map((channel) => (
        <li key={channel.channel_id}>
          {channel.channel_id} - {channel.platform}
        </li>
      ))}
    </ul>
  );
};
