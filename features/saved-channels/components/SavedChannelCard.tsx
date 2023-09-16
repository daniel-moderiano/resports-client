import styles from "features/saved-channels/components/styles/SavedChannelCard.module.css";
import Link from "next/link";

type SavedChannelCardProps = {
  thumbnailUrl: string;
  title: string;
  route: string;
  live?: boolean;
};

export const SavedChannelCard = ({
  thumbnailUrl,
  title,
  route,
  live,
}: SavedChannelCardProps) => {
  return (
    <Link href={route} className={styles.channel}>
      <img
        src={thumbnailUrl}
        alt={`${title} channel thumbnail`}
        height={25}
        width={25}
        className={styles.thumbnail}
      />
      <div className={styles.channelTitle}>{title}</div>
      {live && <div className={styles.live}></div>}
    </Link>
  );
};
