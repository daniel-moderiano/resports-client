import styles from "features/players/components/styles/SeekIndicator.module.css";
import PlayIcon from "icons/PlayIcon";
import { convertSecondsToHumanReadable } from "utils/videoDurationConversion";

interface SeekIndicatorProps {
  projectedSeekInSeconds: number;
}

export const SeekIndicator = ({
  projectedSeekInSeconds,
}: SeekIndicatorProps) => {
  const formattedSeconds = convertSecondsToHumanReadable(
    projectedSeekInSeconds
  );

  return (
    <div
      className={`${
        projectedSeekInSeconds < 0 ? styles.seekBackward : styles.seekForward
      } ${styles.container}`}
      aria-label={
        projectedSeekInSeconds < 0
          ? `Skip backward ${formattedSeconds}`
          : `Skip forward ${formattedSeconds}`
      }
      role="status"
    >
      <div className={styles.innerContent}>
        <div className={styles.iconContainer}>
          <PlayIcon
            fill="#ebebeb"
            className={`${styles.icon} ${styles.iconStart}`}
          />
          <PlayIcon
            fill="#ebebeb"
            className={`${styles.icon} ${styles.iconMiddle}`}
          />
          <PlayIcon
            fill="#ebebeb"
            className={`${styles.icon} ${styles.iconEnd}`}
          />
        </div>
        <span className={styles.seekText}>{formattedSeconds}</span>
      </div>
    </div>
  );
};
