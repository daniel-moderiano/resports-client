import { YouTubeVideoResult } from "types/youtubeAPITypes";
import styles from "features/channels/components/styles/YouTubeVideoListing.module.css";
import { convertYouTubeVideoDuration } from "utils/videoDurationConversion";
import Link from "next/link";
import { timeAgo } from "config/timeAgoFormatter";
import ImageWithFallback from "utils/ImageWithFallback";
import { Routes } from "config/routes";
import { Button } from "components/button";
import { useState } from "react";

interface YouTubeVideoListingProps {
  videoData: YouTubeVideoResult;
}

export const YouTubeVideoListing = ({
  videoData,
}: YouTubeVideoListingProps) => {
  const [isListingVisible, setIsListingVisible] = useState(false);
  return (
    <div className={styles.videoListing}>
      <div className={isListingVisible ? "" : styles.blurOverlay}></div>
      <div>
        <ImageWithFallback
          src={videoData.snippet.thumbnails.medium.url}
          fallbackSrc="/images/no-thumbnail.png"
          height={135}
          width={240}
          alt="Video thumbnail"
        />
        <p className={styles.duration}>
          {convertYouTubeVideoDuration(videoData.contentDetails.duration)}
        </p>
        <p className={styles.createdAt}>
          {timeAgo.format(new Date(videoData.snippet.publishedAt))}
        </p>
      </div>
      <h4 className={styles.title}>{videoData.snippet.title}</h4>
      <p className={styles.channel}>{videoData.snippet.channelTitle}</p>

      <div className={styles.bottomContainer}>
        <div className={styles.linkContainer}>
          <Link
            rel="noopener"
            target="_blank"
            className={styles.link}
            href={`https://www.youtube.com/watch?v=${videoData.id}`}
          >
            View on YouTube
          </Link>
          <Link
            href={`${Routes.youtube.video}/${videoData.id}`}
            className={styles.link}
          >
            View in Player
          </Link>
        </div>
        <Button
          className={styles.revealButton}
          onClick={() => setIsListingVisible(true)}
        >
          Reveal
        </Button>
      </div>
    </div>
  );
};
