import { Button } from "components/button";
import { LoadingSpinner } from "components/spinner";
import {
  useAddSavedChannel,
  useDeleteSavedChannel,
} from "features/saved-channels";
import { Platform } from "features/search";

type SaveChannelButtonProps = {
  isSavedChannel: boolean;
  channelId: string;
  platform: Platform;
};

/**
 * Button component that handles saving or removing a channel, based on whether it is currently saved.
 */
export const SaveChannelButton = ({
  isSavedChannel,
  channelId,
  platform,
}: SaveChannelButtonProps) => {
  const { mutate: saveChannel, isLoading: isSavingChannel } =
    useAddSavedChannel();
  const { mutate: deleteChannel, isLoading: isDeleteChannelLoading } =
    useDeleteSavedChannel();

  return (
    <>
      {isSavedChannel ? (
        <Button
          variant="secondary"
          onClick={() => deleteChannel(channelId)}
          disabled={isDeleteChannelLoading}
        >
          {isDeleteChannelLoading && <LoadingSpinner />}
          Remove
        </Button>
      ) : (
        <Button
          variant="secondary"
          onClick={() =>
            saveChannel({
              channel_id: channelId,
              platform,
            })
          }
          disabled={isSavingChannel}
        >
          {isSavingChannel && <LoadingSpinner />}
          Save
        </Button>
      )}
    </>
  );
};
