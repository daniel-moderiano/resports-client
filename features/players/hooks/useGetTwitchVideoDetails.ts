import { useQuery } from "react-query";
import apiClient from "config/twitchApiClient";
import { TwitchVideo } from "../../channels/types";

// conditions specify any additional criteria that must evaluate to true before the query is executed
export const useGetTwitchVideoDetails = (
  videoId: string,
  conditions?: boolean
) => {
  const { isLoading, isError, data, error, refetch } = useQuery(
    ["twitchVideo", videoId],
    async () => {
      // The apiClient from the twurple library has internal error handling; no manual error handling is required here.
      const videoData = await apiClient.videos.getVideoById(videoId);

      // By initially setting this to null, we can ensure that the data property returned by useQuery will contain the complete data set, or will remain as null.
      let combinedData: TwitchVideo | null = null;

      // Create a custom combination of both responses to produce a more complete set of channel data
      if (videoData) {
        // Complete the video data set by retrieving the video uploader detais
        const userData = await videoData.getUser();
        combinedData = {
          videoData,
          userData,
        };
      }

      return combinedData;
    },
    {
      // Check for additional conditions before formulating enabled expression.
      enabled: conditions !== undefined ? conditions : true,
    }
  );

  return {
    isLoading,
    isError,
    data,
    error,
    refetch,
  };
};
