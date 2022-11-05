import { YouTubeVideoResult } from "../types/youtubeAPITypes";
import styles from "@/styles/componentStyles/YouTubeVideoListing.module.css";
import Image from "next/image";
import { convertYouTubeVideoDuration } from "../helpers/videoDurationConversion";
import Link from "next/link";
import { timeAgo } from "../config/timeAgoFormatter";

interface YouTubeVideoListingProps {
  videoData: YouTubeVideoResult;
}

const YouTubeVideoListing = ({ videoData }: YouTubeVideoListingProps) => {
  return (
    <div className={styles.videoListing}>
      <div className={styles.imageContainer}>
        {videoData.snippet.thumbnails.medium ? (
          <Image
            src={videoData.snippet.thumbnails.medium.url}
            height={135}
            width={240}
            layout="fixed"
            alt="Video thumbnail"
          />
        ) : (
          <Image
            src="/images/no-thumbnail.png"
            height={135}
            width={240}
            layout="fixed"
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
      <Link href={`https://www.youtube.com/watch?v=${videoData.id}`}>
        <a rel="noopener" target="_blank" className={styles.link}>
          View on YouTube
        </a>
      </Link>
      <Link href={`/youtubeVideo/${videoData.id}`}>
        <a className={styles.link}>View in Player</a>
      </Link>
    </div>
  );
};

export default YouTubeVideoListing;
