import React from "react";
import { useRecentlyViewedChannels } from "../hooks/useRecentlyViewedChannels";

export const RecentlyViewedChannels = () => {
  const { recentlyViewedChannels, clearRecentChannels } =
    useRecentlyViewedChannels();

  return (
    <div>
      <button onClick={clearRecentChannels}>
        Clear Recently Viewed Channels
      </button>
      {recentlyViewedChannels.length > 0 ? (
        <ul>
          {recentlyViewedChannels.map((channel) => (
            <li key={channel.channel_id}>
              {channel.platform} - {channel.channel_id}
            </li>
          ))}
        </ul>
      ) : (
        <p>No recently viewed channels</p>
      )}
    </div>
  );
};
