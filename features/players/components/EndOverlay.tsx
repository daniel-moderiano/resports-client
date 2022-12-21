import ReplayIcon from "icons/ReplayIcon";
import styles from "features/players/components/styles/EndOverlay.module.css";

interface EndOverlayProps {
  videoEnded: boolean;
}

export const EndOverlay = ({ videoEnded }: EndOverlayProps) => {
  return (
    <div className={`${styles.endOverlay} ${videoEnded ? styles.show : ""}`}>
      <div className={styles.replayMessage}>
        <p>Reached end of video</p>
        <p>Restarting...</p>

        <ReplayIcon className={styles.replayIcon} />
      </div>
    </div>
  );
};
