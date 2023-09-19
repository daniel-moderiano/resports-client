import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "components/button";
import { LoadingSpinner } from "components/spinner";
import { checkIsSavedChannel } from "features/players/utils/checkIsChannelSaved";
import {
  useAddSavedChannel,
  useDeleteSavedChannel,
  useGetSavedChannels,
} from "features/saved-channels";
import { Platform } from "features/search";
import { useEffect, useState } from "react";

type SaveChannelButtonProps = {
  channelId: string;
  platform: Platform;
};

/**
 * Button component that handles saving or removing a channel, based on whether it is currently saved.
 */
export const SaveChannelButton = ({
  channelId,
  platform,
}: SaveChannelButtonProps) => {
  const { mutate: saveChannel, isLoading: isSavingChannel } =
    useAddSavedChannel();
  const { mutate: deleteChannel, isLoading: isDeleteChannelLoading } =
    useDeleteSavedChannel();
  const { data: savedChannels } = useGetSavedChannels();

  const [isSavedChannel, setIsSavedChannel] = useState<boolean | null>(null);

  useEffect(() => {
    if (savedChannels) {
      const saved = checkIsSavedChannel(
        {
          channel_id: channelId,
          platform,
        },
        savedChannels
      );
      setIsSavedChannel(saved);
    }
  }, [savedChannels, channelId, platform]);

  if (isSavedChannel === null) {
    return null;
  }

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
