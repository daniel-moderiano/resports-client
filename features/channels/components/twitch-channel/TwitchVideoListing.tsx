import { HelixVideo } from "@twurple/api/lib";
import { convertTwitchVideoDuration } from "utils/videoDurationConversion";
import { timeAgo } from "config/timeAgoFormatter";
import styles from "features/channels/components/styles/TwitchVideoListing.module.css";
import Link from "next/link";
import ImageWithFallback from "utils/ImageWithFallback";
import { Routes } from "config/routes";

interface TwitchVideoListingProps {
  videoData: HelixVideo;
}

export const TwitchVideoListing = ({ videoData }: TwitchVideoListingProps) => {
  return (
    <div className={styles.videoListing}>
      <div className={styles.imageContainer}>
        <ImageWithFallback
          src={videoData.getThumbnailUrl(240, 135)}
          fallbackSrc="/images/no-thumbnail.png"
          height={135}
          width={240}
          alt="Video thumbnail"
        />
        <p className={styles.duration}>
          {convertTwitchVideoDuration(videoData.duration)}
        </p>
        <p className={styles.createdAt}>
          {timeAgo.format(videoData.creationDate)}
        </p>
      </div>
      <h4 className={styles.title}>{videoData.title}</h4>
      <p className={styles.channel}>{videoData.userDisplayName}</p>
      <Link
        href={videoData.url}
        rel="noopener"
        target="_blank"
        className={styles.link}
      >
        View on Twitch
      </Link>
      <Link
        href={`${Routes.twitch.video}/${videoData.id}`}
        className={styles.link}
      >
        View in Player
      </Link>
    </div>
  );
};
