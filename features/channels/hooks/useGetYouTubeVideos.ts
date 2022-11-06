import { useGapiContext } from "providers/GapiContext";
import { useQuery } from "react-query";
import {
  YouTubePlaylistItemListResponse,
  YouTubeSearchListResponse,
  YouTubeVideoListResponse,
} from "types/youtubeAPITypes";

// Conditions specify any additional criteria that must evaluate to true before the query is executed
export const useGetYouTubeVideos = (
  uploadsPlaylistId: string,
  conditions?: boolean
) => {
  const { gapiClientReady } = useGapiContext();

  const { isLoading, isError, data, error } = useQuery(
    ["youtubeChannelVideos", uploadsPlaylistId],
    async () => {
      // GAPI client will throw its own error if there is a problem with the request, there is no need for a specific try/catch here

      // First the PlaylistItem route must be called. This fetches a list of the channel's uploaded vids. This is used because it is a 1 unit quote call vs a 100 unit quota call using Search: list
      const playlistResponse = await gapi.client.request({
        path: "https://www.googleapis.com/youtube/v3/playlistItems",
        params: {
          part: "snippet,id,contentDetails", // the information returned
          playlistId: uploadsPlaylistId, // returns only videos by the specified channel (max 500)
          maxResults: 50, // max number of results per page (50 max)
        },
      });

      // * This ignores pagination at this stage
      const playListResult =
        playlistResponse.result as YouTubePlaylistItemListResponse;

      //  The playlist call does not include some key video information, namely the video duration. Therefore, we take the video IDs from the playlist items, and call the video API route directly (incurs a single unit of quota only)
      let videoIds = "";

      // A comma separated list of video IDs is required to make the video API call, hence we generate this here
      playListResult.items.forEach((item, index) => {
        if (index === 0) {
          videoIds += `${item.contentDetails.videoId}`;
        } else {
          videoIds += `,${item.contentDetails.videoId}`;
        }
      });

      // This call returns more detailed individual video data and should be used to render videos
      const videosResponse = await gapi.client.request({
        path: "https://www.googleapis.com/youtube/v3/videos",
        params: {
          part: "contentDetails,id,liveStreamingDetails,player,snippet,statistics", // the information returned
          id: videoIds, // returns only videos by the specified channel (max 500)
          maxResults: 50, // max number of results per page (50 max)
        },
      });

      return videosResponse.result as YouTubeVideoListResponse;
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
