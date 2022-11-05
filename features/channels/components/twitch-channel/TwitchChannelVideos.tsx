import { HelixVideo, HelixVideoType } from "@twurple/api/lib";
import { useGetTwitchVideos } from "features/channels/hooks/useGetTwitchVideos";
import TwitchVideoListing from "./TwitchVideoListing";
import * as React from "react";
import styles from "../styles/componentStyles/TwitchChannelVideos.module.css";
import { useEffect, useState } from "react";
import {
  filterByDateTwitch,
  filterByDurationTwitch,
  filterByKeywordTwitch,
} from "features/channels/utils/twitchVideoFilters";
import VideosFilterMenu from "features/players/components/VideosFilterMenu";

interface TwitchChannelVideosProps {
  userId: string;
}

export interface VideoFilters {
  dateFilter: Date;
  minDurationFilter: number;
  maxDurationFilter: number;
  keywordFilter: string;
}

// Make API call here to fetch videos using channel/user ID
// * Use the archive video type filter to get past broadcasts!!

const TwitchChannelVideos = ({ userId }: TwitchChannelVideosProps) => {
  const [filters, setFilters] = React.useState<VideoFilters | null>(null);

  const handleOptionSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // This typecasting is required, as you cannot simply assign the 'string' value type to the videoType state
    setVideoType(e.target.value as HelixVideoType | "all");
  };

  const [videoType, setVideoType] = useState<
    HelixVideoType | undefined | "all"
  >("archive");
  const [hideVideos, setHideVideos] = useState(true);
  const [filteredVideos, setFilteredVideos] = React.useState<
    HelixVideo[] | undefined | null
  >(null);
  const { isError, isLoading, data } = useGetTwitchVideos(userId, videoType);

  // This effect is used to control video data whenever filters are applied (either new filters or changed filters)
  useEffect(() => {
    let tempVideos: HelixVideo[] = [];
    if (data) {
      // Attempting filter without data will throw an error
      tempVideos = data;
      if (filters) {
        tempVideos = filterByDurationTwitch(
          tempVideos,
          filters.minDurationFilter,
          filters.maxDurationFilter
        );
        tempVideos = filterByDateTwitch(tempVideos, filters.dateFilter);
        tempVideos = filterByKeywordTwitch(tempVideos, filters.keywordFilter);

        //  At this stage the tempVideos variable will contain the fully filtered data set. IT is ready to assign
        setFilteredVideos(tempVideos);
      } else {
        // Must have a fallback to set filtered videos to available data or else videos will never render
        setFilteredVideos(data);
      }
    }
  }, [data, filters]);

  return (
    <section>
      <h2>Twitch Channel Videos</h2>
      {isLoading && <div>Videos loading...</div>}

      {isError && <div>An error has occurred</div>}

      <VideosFilterMenu setFilters={setFilters} />

      {/*Ensure an option exists to clear all filters*/}
      <button onClick={() => setFilteredVideos(data ? data : null)}>
        Clear filters
      </button>

      <div>
        <label htmlFor="videoType">Video type</label>
        <select
          defaultValue={videoType}
          onChange={handleOptionSelect}
          name="videoType"
          id="videoType"
        >
          <option value="all" data-testid="allOption">
            All videos
          </option>
          <option value="archive" data-testid="broadcastOption">
            Broadcasts
          </option>
        </select>
      </div>

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
                  <TwitchVideoListing key={video.id} videoData={video} />
                ))}
              </>
            ) : (
              <div>No videos</div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default TwitchChannelVideos;
