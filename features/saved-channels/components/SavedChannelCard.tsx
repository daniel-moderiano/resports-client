import { SaveChannelButton } from "features/players";
import styles from "features/saved-channels/components/styles/SavedChannelCard.module.css";
import { Platform } from "features/search";
import Link from "next/link";

type SavedChannelCardProps = {
  thumbnailUrl: string;
  title: string;
  route: string;
  live?: boolean;
  channelId: string;
  platform: Platform;
};

export const SavedChannelCard = ({
  thumbnailUrl,
  title,
  route,
  live,
  channelId,
  platform,
}: SavedChannelCardProps) => {
  return (
    <div className={styles.channel}>
      <div className={styles.imgContainer}>
        <img
          src={thumbnailUrl}
          alt={`${title} channel thumbnail`}
          height={50}
          width={50}
          className={styles.thumbnail}
        />
        {live && <span className={styles.live}>LIVE</span>}
      </div>

      <Link href={route} className={styles.channelLink}>
        <span className={styles.channelTitle}>{title}</span>
      </Link>
      <SaveChannelButton channelId={channelId} platform={platform} />
    </div>
  );
};
