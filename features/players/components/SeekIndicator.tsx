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
        <div
          className={`${styles.iconContainer} ${
            projectedSeekInSeconds < 0 ? styles.iconsReverse : ""
          }`}
        >
          <PlayIcon
            fill="#ebebeb"
            className={`${styles.icon} ${styles.iconStart} ${
              projectedSeekInSeconds < 0 ? styles.iconBackward : ""
            }`}
            testId="playIcon"
          />
          <PlayIcon
            fill="#ebebeb"
            className={`${styles.icon} ${styles.iconMiddle} ${
              projectedSeekInSeconds < 0 ? styles.iconBackward : ""
            }`}
          />
          <PlayIcon
            fill="#ebebeb"
            className={`${styles.icon} ${styles.iconEnd} ${
              projectedSeekInSeconds < 0 ? styles.iconBackward : ""
            }`}
          />
        </div>
        <span className={styles.seekText}>{formattedSeconds}</span>
      </div>
    </div>
  );
};
