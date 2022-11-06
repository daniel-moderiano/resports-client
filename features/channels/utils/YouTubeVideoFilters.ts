// These functions are intended for use in the YouTubeChannelVideos component to filter the returned videos data set according to the specifications
import { YouTubeVideoResult } from "types/youtubeAPITypes";
import { convertISOToSeconds } from "utils/videoDurationConversion";

// Able to take any kind of date input. It was decided to include a >= operator as it makes intuitive sense to filter by 'created after this date' to include time later that day ON the date/time selected
export const filterByDateYouTube = (
  videos: YouTubeVideoResult[],
  dateLimit: Date
) => {
  const filteredVideos = videos.filter((video) => {
    return new Date(video.snippet.publishedAt) <= dateLimit;
  });

  return filteredVideos;
};

// The 0 minimum is self-explanatory; the 180000 maximum is equivalent to 50 hours. This more than covers the max Twitch stream length of 48
export const filterByDurationYouTube = (
  videos: YouTubeVideoResult[],
  minimumDurationInSeconds = -1,
  maximumDurationInSeconds = 180000
) => {
  const filteredVideos = videos.filter((video) => {
    return (
      convertISOToSeconds(video.contentDetails.duration) >=
        minimumDurationInSeconds &&
      convertISOToSeconds(video.contentDetails.duration) <
        maximumDurationInSeconds
    );
  });

  return filteredVideos;
};

// Essentially used as a search function with a user provided keyword/search query. All strings must be case-matched before comparison occurs to avoid a case-sensitive search
export const filterByKeywordYouTube = (
  videos: YouTubeVideoResult[],
  keyword: string
) => {
  const filteredVideos = videos.filter((video) => {
    return video.snippet.title
      .toLowerCase()
      .includes(keyword.trim().toLowerCase());
  });

  return filteredVideos;
};
