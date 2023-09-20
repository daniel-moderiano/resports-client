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
  console.log(recentChannels);

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
        // If the channel is already at the top, no need to change the state
        if (prevChannels[0].channel_id === channel.channel_id) {
          return prevChannels;
        }

        const remainingChannels = prevChannels.filter(
          (_channel) => _channel.channel_id !== channel.channel_id
        );
        // Move the channel to the 'top' of the list
        const updatedChannelList = [channel, ...remainingChannels];
        saveToLocalStorage("recentChannels", updatedChannelList);
        return [channel, ...remainingChannels];
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
