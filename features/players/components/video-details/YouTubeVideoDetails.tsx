import React from "react";
import Image from "next/image";
import styles from "features/players/components/styles/TwitchVideoDetails.module.css";
import Link from "next/link";
import { timeAgo } from "config/timeAgoFormatter";

import { useGetYouTubeVideoDetails } from "features/players/hooks/useGetYouTubeVideoDetails";
import YouTubeFullIcon from "icons/YouTubeFullIcon";

interface YouTubeVideoDetailsProps {
  videoId: string;
}

const formatter = Intl.NumberFormat("en", { notation: "compact" });

export const YouTubeVideoDetails = ({ videoId }: YouTubeVideoDetailsProps) => {
  const { isError, isLoading, data } = useGetYouTubeVideoDetails(videoId);

  return (
    <div className={styles.outerContainer}>
      {data && (
        <section className={styles.innerContainer}>
          <div className={styles.videoDetails}>
            <h2 className={styles.videoTitle}>
              {data.videoData.snippet.title}
            </h2>

            <div className={styles.metricsContainer}>
              <div className={styles.bar}></div>
              <p>
                {timeAgo.format(new Date(data.videoData.snippet.publishedAt))}
              </p>
              <span className={styles.dot}>·</span>
              <p>
                {formatter.format(
                  parseInt(data.videoData.statistics.viewCount)
                )}{" "}
                views
              </p>
            </div>
            <div className={styles.channelContainer}>
              <Link
                href={`/youtube/channel/${data.channelData.id}`}
                data-testid="channelImageLink"
                className={styles.imageLink}
              >
                <span className={styles.srOnly}>
                  {data.channelData.snippet.title}
                </span>
                <Image
                  alt={`${data.channelData.snippet.title} thumbnail`}
                  src={data.channelData.snippet.thumbnails.default.url}
                  width={55}
                  height={55}
                  className={styles.channelThumbnail}
                />
              </Link>

              <Link
                className={styles.channelName}
                href={`/youtube/channel/${data.channelData.id}`}
                data-testid="channelLink"
              >
                {data.channelData.snippet.title}
              </Link>
              <button className={styles.saveButton}>+ Save</button>
            </div>
          </div>
          <div className={styles.rightContainer}>
            <Link
              className={styles.youtubeLink}
              href={`https://www.youtube.com/watch?v=${data.videoData.id}`}
            >
              Watch on
              <YouTubeFullIcon className={styles.youtubeIcon} />
            </Link>
          </div>
        </section>
      )}
    </div>
  );
};
