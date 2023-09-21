import { useEffect } from "react";
import { Channel } from "types/backendAPITypes";
import { useRecentlyViewedChannels } from "./useRecentlyViewedChannels";

/**
 * A hook that adds the specified channel to the recently viewed channels list on mount.
 *
 * @param {Channel} channel - The channel to add to the recent list.
 */
export function useAddChannelToRecent(channel: Channel) {
  const { addChannelToRecent } = useRecentlyViewedChannels();

  useEffect(() => {
    addChannelToRecent(channel);
  }, [channel, addChannelToRecent]);
}
