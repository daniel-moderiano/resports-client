import { useQuery } from "react-query";
import apiClient from "../config/twitchApiClient";
import { HelixVideoType } from "@twurple/api/lib";

// conditions specify any additional criteria that must evaluate to true before the query is executed
export const useGetTwitchVideos = (
  userId: string,
  videoType: HelixVideoType | "all" = "archive",
  conditions?: boolean
) => {
  const { isLoading, isError, data, error, refetch } = useQuery(
    ["twitchChannelVideos", userId, videoType],
    async () => {
      // The apiClient from the twurple library has internal error handling; no manual error handling is required here.
      // const response = await apiClient.videos.getVideosByUser(userId, );
      const request = apiClient.videos.getVideosByUserPaginated(userId, {
        type: videoType ? videoType : "all",
      });

      // By calling getNext on the paginated request, we are essentially asking for the FIRST page of the request.
      // This provides the first 100 items
      return await request.getNext();
    },
    {
      // Check for additional conditions before formulating enabled expression. gapiClientReady must always be present, as must enableApi
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
