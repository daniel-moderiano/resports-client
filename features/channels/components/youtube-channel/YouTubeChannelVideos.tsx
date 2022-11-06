import { useGetYouTubeVideos } from "features/channels/hooks/useGetYouTubeVideos";
import * as React from "react";
import { YouTubeVideoListing } from "./YouTubeVideoListing";
import { useEffect, useState } from "react";
import styles from "features/channels/components/styles/YouTubeChannelVideos.module.css";
import { VideosFilterMenu } from "../VideosFilterMenu";
import { VideoFilters } from "features/channels/types";
import { YouTubeVideoResult } from "types/youtubeAPITypes";
import {
  filterByDateYouTube,
  filterByDurationYouTube,
  filterByKeywordYouTube,
} from "features/channels/utils/YouTubeVideoFilters";

interface YouTubeChannelVideosProps {
  uploadsId: string;
}

export const YouTubeChannelVideos = ({
  uploadsId,
}: YouTubeChannelVideosProps) => {
  const { isLoading, isError, data } = useGetYouTubeVideos(uploadsId);
  const [hideVideos, setHideVideos] = useState(true);
  const [filters, setFilters] = React.useState<VideoFilters | null>(null);

  const [filteredVideos, setFilteredVideos] = React.useState<
    YouTubeVideoResult[] | undefined | null
  >(null);

  // This effect is used to control video data whenever filters are applied (either new filters or changed filters)
  useEffect(() => {
    let tempVideos: YouTubeVideoResult[] = [];
    if (data) {
      // Attempting filter without data will throw an error
      tempVideos = data.items;
      if (filters) {
        tempVideos = filterByDurationYouTube(
          tempVideos,
          filters.minDurationFilter,
          filters.maxDurationFilter
        );
        tempVideos = filterByDateYouTube(tempVideos, filters.dateFilter);
        tempVideos = filterByKeywordYouTube(tempVideos, filters.keywordFilter);

        //  At this stage the tempVideos variable will contain the fully filtered data set. IT is ready to assign
        setFilteredVideos(tempVideos);
      } else {
        // Must have a fallback to set filtered videos to available data or else videos will never render
        setFilteredVideos(data.items);
      }
    }
  }, [data, filters]);

  return (
    <div>
      YouTube Channel Videos
      {isLoading && <div>YouTube loading...</div>}
      {isError && <div>An error has occurred</div>}
      <VideosFilterMenu setFilters={setFilters} />
      <div className={styles.container}>
        {hideVideos && (
          <div className={styles.overlay} data-testid="overlay">
            <button onClick={() => setHideVideos(false)}>Reveal videos</button>
          </div>
        )}
        {filteredVideos && (
          <div className={styles.videosList}>
            {filteredVideos.length > 0 ? (
              <>
                {filteredVideos.map((video) => (
                  <YouTubeVideoListing key={video.id} videoData={video} />
                ))}
              </>
            ) : (
              <div>No videos</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
