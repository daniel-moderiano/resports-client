import { useState, useEffect } from "react";
import { Channel } from "types/backendAPITypes";
import {
  clearLocalStorage,
  getFromLocalStorage,
  saveToLocalStorage,
} from "../utils/localStorage";

const MAX_RECENT_CHANNELS = 5;

export function useRecentlyViewedChannels() {
  const [recentChannels, setRecentChannels] = useState<Channel[]>([]);

  useEffect(() => {
    const storedChannels =
      getFromLocalStorage<Channel[]>("recentChannels") || [];
    setRecentChannels(storedChannels);
  }, []);

  const addChannelToRecent = (channel: Channel) => {
    setRecentChannels((prevChannels) => {
      // Check if the channel is already in the list
      if (
        prevChannels.some(
          (_channel) => _channel.channel_id === channel.channel_id
        )
      ) {
        return prevChannels;
      }

      const newChannels = [channel, ...prevChannels].slice(
        0,
        MAX_RECENT_CHANNELS
      );
      saveToLocalStorage("recentChannels", newChannels);
      return newChannels;
    });
  };

  const clearRecentChannels = () => {
    clearLocalStorage("recentChannels");
    setRecentChannels([]);
  };

  return {
    recentlyViewedChannels: recentChannels,
    addChannelToRecent,
    clearRecentChannels,
  };
}
