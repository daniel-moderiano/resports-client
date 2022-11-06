import { YouTubeVideoResult } from "types/youtubeAPITypes";
import styles from "features/channels/components/styles/YouTubeVideoListing.module.css";
import Image from "next/image";
import { convertYouTubeVideoDuration } from "utils/videoDurationConversion";
import Link from "next/link";
import { timeAgo } from "config/timeAgoFormatter";

interface YouTubeVideoListingProps {
  videoData: YouTubeVideoResult;
}

export const YouTubeVideoListing = ({
  videoData,
}: YouTubeVideoListingProps) => {
  return (
    <div className={styles.videoListing}>
      <div className={styles.imageContainer}>
        {videoData.snippet.thumbnails.medium ? (
          <Image
            src={videoData.snippet.thumbnails.medium.url}
            height={135}
            width={240}
            alt="Video thumbnail"
          />
        ) : (
          <Image
            src="/images/no-thumbnail.png"
            height={135}
            width={240}
            alt="Video thumbnail"
          />
        )}
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
      <Link href={`/youtubeVideo/${videoData.id}`} className={styles.link}>
        View in Player
      </Link>
    </div>
  );
};
