import { Channel } from "types/backendAPITypes";

/**
 * Checks if a given channel is saved (i.e. in a list of saved channels)
 *
 * @param channel - The channel to check
 * @param savedChannels - All currently saved channels
 * @returns - True if the channel is saved, otherwise false
 */
export const checkIsSavedChannel = (
  channel: Channel,
  savedChannels: Channel[]
) => {
  return savedChannels.some((savedChannel) => {
    return (
      savedChannel.channel_id === channel.channel_id &&
      savedChannel.platform == channel.platform
    );
  });
};
