import { useQuery } from "react-query";
import apiClient from "config/twitchApiClient";
import { TwitchVideoDetails } from "../types";

const obj = {
  creationDate:
    "Wed Nov 23 2022 11:30:10 GMT+1030 (Australian Central Daylight Time)",
  description: "",
  duration: "48h0m0s",
  durationInSeconds: 172800,
  id: "1660299355",
  isPublic: true,
  language: "en",
  publishDate:
    "Wed Nov 23 2022 11:30:10 GMT+1030 (Australian Central Daylight Time)",
  streamId: "41530883467",
  thumbnailUrl:
    "https://static-cdn.jtvnw.net/cf_vods/d2nvs31859zcd8/91c9176a5551b2713054_btssmash_41530883467_1669165206//thumb/thumb0-%{width}x%{height}.jpg",
  title:
    "RERUN: 2saint vs Steech - Melee Singles Pools WQF - The Big House 10 | Jigglypuff vs Fox",
  type: "archive",
  url: "https://www.twitch.tv/videos/1660299355",
  userDisplayName: "btssmash",
  userId: "214062798",
  userName: "btssmash",
  views: 11195,
};

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
      let combinedData: TwitchVideoDetails | null = null;

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
