import { HelixVideo } from "@twurple/api/lib";
import Image from "next/image";
import { convertTwitchVideoDuration } from "utils/videoDurationConversion";
import { timeAgo } from "config/timeAgoFormatter";
import styles from "features/channels/components/styles/TwitchVideoListing.module.css";
import Link from "next/link";

interface TwitchVideoListingProps {
  videoData: HelixVideo;
}

export const TwitchVideoListing = ({ videoData }: TwitchVideoListingProps) => {
  return (
    <div className={styles.videoListing}>
      <div className={styles.imageContainer}>
        {videoData.getThumbnailUrl(240, 135) ? (
          <Image
            src={videoData.getThumbnailUrl(240, 135)}
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
          {convertTwitchVideoDuration(videoData.duration)}
        </p>
        <p className={styles.createdAt}>
          {timeAgo.format(videoData.creationDate)}
        </p>
      </div>
      <h4 className={styles.title}>{videoData.title}</h4>
      <p className={styles.channel}>{videoData.userDisplayName}</p>
      <Link href={videoData.url}>
        <a rel="noopener" target="_blank" className={styles.link}>
          View on Twitch
        </a>
      </Link>
      <Link href={`/twitchVideo/${videoData.id}`}>
        <a rel="noopener" target="_blank" className={styles.link}>
          View in Player
        </a>
      </Link>
    </div>
  );
};
