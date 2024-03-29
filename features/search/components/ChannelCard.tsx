import { SaveChannelButton } from "features/players";
import styles from "features/search/components/styles/ChannelCard.module.css";
import Link from "next/link";
import { Platform } from "./SearchBar";

type ChannelCardProps = {
  thumbnailUrl: string;
  title: string;
  description?: string;
  route: string;
  live?: boolean;
  gameName?: string;
  channelId: string;
  platform: Platform;
};

export const ChannelCard = ({
  thumbnailUrl,
  title,
  description,
  route,
  live,
  gameName,
  channelId,
  platform,
}: ChannelCardProps) => {
  return (
    <div className={styles.channel}>
      <div className={styles.imgContainer}>
        <img
          src={thumbnailUrl}
          alt={`${title} channel thumbnail`}
          height={100}
          width={100}
          className={styles.thumbnail}
        />
        {live && <span className={styles.live}>LIVE</span>}
      </div>
      <div className={styles.channelText}>
        <Link href={route}>
          <h3 className={styles.channelTitle}>{title}</h3>
        </Link>
        <p className={styles.description}>{description}</p>
        {gameName && <p className={styles.game}>{gameName}</p>}
      </div>
      <SaveChannelButton channelId={channelId} platform={platform} />
    </div>
  );
};
