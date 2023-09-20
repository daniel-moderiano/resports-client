import { useEffect } from "react";
import { Channel } from "types/backendAPITypes";
import { useRecentlyViewedChannels } from "./useRecentlyViewedChannels";

export function useAddChannelToRecentOnMount(channel: Channel) {
  const { addChannelToRecent } = useRecentlyViewedChannels();

  useEffect(() => {
    addChannelToRecent(channel);
  }, [channel, addChannelToRecent]);
}
