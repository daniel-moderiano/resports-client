import { useUserId } from "features/auth/hooks/useUserId";
import { useState, useEffect } from "react";
import { Channel } from "types/backendAPITypes";
import {
  clearLocalStorage,
  getFromLocalStorage,
  saveToLocalStorage,
} from "../utils/localStorage";

const MAX_RECENT_CHANNELS = 5;

/**
 * A hook to manage a user's recently viewed channels list. Utilizes local storage and is
 * bounded to a maximum of 5 recent channels. Depends on a valid `userId`.
 *
 * @returns
 * - recentlyViewedChannels: array of recent channels
 * - addChannelToRecent: function to add a channel to the recent list
 * - clearRecentChannels: function to clear the recent channels list
 */
export function useRecentlyViewedChannels() {
  const userId = useUserId();
  const [recentChannels, setRecentChannels] = useState<Channel[]>([]);

  useEffect(() => {
    if (!userId) {
      return;
    }

    const storageKey = `recentChannels-${userId}`;
    const storedChannels = getFromLocalStorage<Channel[]>(storageKey) || [];
    setRecentChannels(storedChannels);
  }, [userId]);

  const addChannelToRecent = (channel: Channel) => {
    if (!userId) {
      return;
    }

    setRecentChannels((prevChannels) => {
      const storageKey = `recentChannels-${userId}`;
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
        saveToLocalStorage(storageKey, updatedChannelList);
        return [channel, ...remainingChannels];
      }

      const newChannels = [channel, ...prevChannels];

      // Get the count of the new channel's platform
      const platformCount = newChannels.filter(
        (ch) => ch.platform === channel.platform
      ).length;
      console.log(platformCount);

      // If the count exceeds MAX_RECENT_CHANNELS, remove the oldest entry of that platform
      if (platformCount > MAX_RECENT_CHANNELS) {
        for (let i = newChannels.length - 1; i >= 0; i--) {
          if (newChannels[i].platform === channel.platform) {
            newChannels.splice(i, 1);
            break;
          }
        }
      }
      saveToLocalStorage(storageKey, newChannels);
      return newChannels;
    });
  };

  const clearRecentChannels = () => {
    if (!userId) {
      return;
    }

    const storageKey = `recentChannels-${userId}`;
    clearLocalStorage(storageKey);
    setRecentChannels([]);
  };

  return {
    recentlyViewedChannels: recentChannels,
    addChannelToRecent,
    clearRecentChannels,
  };
}
