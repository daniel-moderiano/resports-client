import { useGapiContext } from "../context/GapiContext";
import { useQuery } from "react-query";
import { YouTubeChannelSearchListResponse } from "types/youtubeAPITypes";

export const useGetYouTubeChannel = (
  channelId: string,
  conditions?: boolean
) => {
  const { gapiClientReady } = useGapiContext();

  const { isLoading, isError, data, error } = useQuery(
    ["youtubeChannel", channelId],
    async () => {
      // GAPI client will throw it's own error if there is a problem with the request, there is no need for a specific try/catch here

      // Make a request to 'search' for a YouTube channel by channel ID. This will return a single result
      const response = await gapi.client.request({
        path: "https://www.googleapis.com/youtube/v3/channels",
        params: {
          part: [
            // the nature of data returned
            "snippet",
            "brandingSettings",
            "statistics",
            "contentDetails",
            "status",
          ],
          id: channelId, // filter/search by channelId
        },
      });

      const searchResult = response.result as YouTubeChannelSearchListResponse;

      if (searchResult.items) {
        // items property undefined in cases of zero results/channel not found
        // Safe to return first element of array, as there will only ever be a single index associated with a channel ID.
        return { channelData: searchResult.items[0] };
      } else {
        // Null is used here so we can check for the presence of channelData, and provide a custom error accordingly
        return { channelData: null };
      }
    },
    {
      // Check for additional conditions before formulating enabled expression. gapiClientReady must always be present, as must enableApi
      enabled:
        conditions !== undefined
          ? conditions && gapiClientReady
          : gapiClientReady,
    }
  );

  return {
    isLoading,
    isError,
    data,
    error,
  };
};
