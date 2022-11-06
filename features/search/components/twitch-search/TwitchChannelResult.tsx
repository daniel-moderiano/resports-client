import Image from "next/image";
import { HelixChannelSearchResult } from "@twurple/api/lib/api/helix/search/HelixChannelSearchResult";
import styles from "features/search/components/styles/TwitchSearchResult.module.css";
import Link from "next/link";

interface TwitchChannelResultProps {
  channelData: HelixChannelSearchResult;
}

export const TwitchChannelResult = ({
  channelData,
}: TwitchChannelResultProps) => {
  return (
    <div className={styles.channel}>
      <div className={styles.imgContainer}>
        <Image
          src={channelData.thumbnailUrl}
          alt={`${channelData.displayName} channel thumbnail`}
          height={100}
          width={100}
          className={styles.thumbnail}
        />
        {channelData.isLive && <span className={styles.live}>LIVE</span>}
      </div>
      <div className={styles.channelText}>
        <Link href={`/twitchChannel/${channelData.id}`}>
          <h3 className={styles.channelTitle}>{channelData.displayName}</h3>
        </Link>
        <p className={styles.game}>{channelData.gameName}</p>
      </div>
    </div>
  );
};
