import { YouTubeSearchResultSnippet } from "types/youtubeAPITypes";
import styles from "features/search/components/styles/YouTubeSearchResult.module.css";
import Link from "next/link";
import { Routes } from "config/routes";

interface YouTubeChannelResultProps {
  channelData: YouTubeSearchResultSnippet;
}
// This component is used to render a search result 'listing' for an individual channel.
export const YouTubeChannelResult = ({
  channelData,
}: YouTubeChannelResultProps) => {
  return (
    <div className={styles.channel}>
      <div>
        <img
          src={channelData.thumbnails.medium.url}
          alt={`${channelData.channelTitle} channel thumbnail`}
          height={100}
          width={100}
          className={styles.thumbnail}
        />
      </div>
      <div className={styles.channelText}>
        <Link href={`${Routes.youtube.channel}/${channelData.channelId}`}>
          <h3 className={styles.channelTitle}>{channelData.channelTitle}</h3>
        </Link>
        <p className={styles.description}>{channelData.description}</p>
      </div>
    </div>
  );
};
