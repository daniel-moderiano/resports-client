import { YouTubeVideoResult } from "types/youtubeAPITypes";
import styles from "features/channels/components/styles/YouTubeVideoListing.module.css";
import { convertYouTubeVideoDuration } from "utils/videoDurationConversion";
import Link from "next/link";
import { timeAgo } from "config/timeAgoFormatter";
import ImageWithFallback from "utils/ImageWithFallback";
import { Routes } from "config/routes";

interface YouTubeVideoListingProps {
  videoData: YouTubeVideoResult;
}

export const YouTubeVideoListing = ({
  videoData,
}: YouTubeVideoListingProps) => {
  return (
    <div className={styles.videoListing}>
      <div className={styles.imageContainer}>
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
  );
};
