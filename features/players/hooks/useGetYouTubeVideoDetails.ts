import { useGapiContext } from "providers/GapiContext";
import { useQuery } from "react-query";
import {
  YouTubeVideoData,
  YouTubeVideoListResponse,
} from "types/youtubeAPITypes";

// Conditions specify any additional criteria that must evaluate to true before the query is executed
export const useGetYouTubeVideoDetails = (
  videoId: string,
  conditions?: boolean
) => {
  const { gapiClientReady } = useGapiContext();

  const { isLoading, isError, data, error } = useQuery(
    ["youtubeVideoDetails", videoId],
    async () => {
      // GAPI client will throw its own error if there is a problem with the request, there is no need for a specific try/catch here

      // This call returns more detailed individual video data and should be used to render videos
      const videoDetailsRequest = await gapi.client.request({
        path: "https://www.googleapis.com/youtube/v3/videos",
        params: {
          part: "id,snippet,statistics",
          id: videoId,
        },
      });

      const videoDetails: YouTubeVideoListResponse = videoDetailsRequest.result;

      // Also fetch the channel details to help craft the video details section under the video
      const channelDetailsRequest = await gapi.client.request({
        path: "https://www.googleapis.com/youtube/v3/channels",
        params: {
          part: ["snippet", "statistics"],
          id: videoDetails.items[0].snippet.channelId,
        },
      });

      const completeResults: YouTubeVideoData = {
        videoData: videoDetails.items[0],
        channelData: channelDetailsRequest.result.items[0],
      };

      return completeResults;
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
