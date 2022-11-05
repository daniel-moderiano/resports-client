import { YouTubeSearchResultSnippet } from "types/youtubeAPITypes";
import Image from "next/image";
import styles from "../styles/componentStyles/YouTubeSearchResult.module.css";
import Link from "next/link";

interface YouTubeChannelResultProps {
  channelData: YouTubeSearchResultSnippet;
}
// This component is used to render a search result 'listing' for an individual channel.
const YouTubeChannelResult = ({ channelData }: YouTubeChannelResultProps) => {
  return (
    <div className={styles.channel}>
      <div>
        <Image
          src={channelData.thumbnails.medium.url}
          alt={`${channelData.channelTitle} channel thumbnail`}
          height={100}
          width={100}
          className={styles.thumbnail}
          layout="fixed"
        />
      </div>
      <div className={styles.channelText}>
        <Link href={`/youtubeChannel/${channelData.channelId}`}>
          <a>
            <h3 className={styles.channelTitle}>{channelData.channelTitle}</h3>
          </a>
        </Link>
        <p className={styles.description}>{channelData.description}</p>
      </div>
    </div>
  );
};

export default YouTubeChannelResult;
