import { useGapiContext } from "providers/GapiContext";
import { useQuery } from "react-query";
import { YouTubeSearchListResponse } from "types/youtubeAPITypes";

// searchType should be a comma separated list of one or more of channels, playlist, and video (e.g. "channel,video")
// Conditions specify any additional criteria that must evaluate to true before the query is executed
export const useYouTubeSearch = (
  searchQuery: string,
  searchType: string,
  conditions?: boolean
) => {
  const { gapiClientReady } = useGapiContext();

  let enableApi = false;

  // ! Default this API call to NEVER occur in development unless manually set here. This API call cost 100 units of quota, so if you burn through 100 calls, every YouTube API feature is locked for 24 hours.
  if (process.env.NODE_ENV === "development") {
    enableApi = true;
  } else {
    enableApi = false;
  }

  const { isLoading, isError, data, error } = useQuery(
    ["youtubeSearchResults", searchQuery],
    async () => {
      // GAPI client will throw its own error if there is a problem with the request, there is no need for a specific try/catch here
      console.log("Calling YouTube API fetch");

      const response = await gapi.client.request({
        path: "https://youtube.googleapis.com/youtube/v3/search",
        params: {
          part: "snippet", // the type/nature of data returned
          q: searchQuery, //search query
          type: searchType, // restrict to channels only
          maxResults: 25, // max number of results per page
        },
      });

      // * This ignores pagination at this stage
      return response.result as YouTubeSearchListResponse;
    },
    {
      // Check for additional conditions before formulating enabled expression. gapiClientReady must always be present, as must enableApi
      enabled:
        conditions !== undefined
          ? conditions && gapiClientReady && enableApi
          : gapiClientReady && enableApi,
    }
  );

  return {
    isLoading,
    isError,
    data,
    error,
  };
};
