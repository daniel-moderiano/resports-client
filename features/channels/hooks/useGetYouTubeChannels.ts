import { useGapiContext } from "providers/GapiContext";
import { useQuery } from "react-query";
import { YouTubeChannelSearchListResponse } from "types/youtubeAPITypes";

export const useGetYouTubeChannels = (
  channelIds: string[],
  conditions?: boolean
) => {
  const { gapiClientReady } = useGapiContext();

  const { isLoading, isError, data, error } = useQuery(
    ["youtubeChannels", channelIds],
    async () => {
      const response = await gapi.client.request({
        path: "https://www.googleapis.com/youtube/v3/channels",
        params: {
          part: [
            "snippet",
            "brandingSettings",
            "statistics",
            "contentDetails",
            "status",
          ],
          id: channelIds.join(","),
        },
      });

      const searchResult = response.result as YouTubeChannelSearchListResponse;

      return searchResult.items;
    },
    {
      enabled:
        conditions !== undefined
          ? conditions && gapiClientReady
          : gapiClientReady,
      refetchOnWindowFocus: false,
    }
  );

  return {
    isLoading,
    isError,
    data,
    error,
  };
};
