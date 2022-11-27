import styles from "features/players/components/styles/SeekIndicator.module.css";
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
      {formattedSeconds}
    </div>
  );
};
