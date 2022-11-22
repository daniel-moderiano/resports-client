import styles from "features/players/components/styles/VideoControlIndicator.module.css";
import PauseIcon from "icons/PauseIcon";
import PlayIcon from "icons/PlayIcon";
import { ControlAction } from "./VideoPlayer";

interface VideoControlIndicatorProps {
  ariaLabel: string;
  controlAction: ControlAction | null;
  triggerAnimation: boolean;
}

const selectIcon = (action: ControlAction | null) => {
  let icon: JSX.Element | null = null;

  switch (action) {
    case "play":
      // Need at least one icon with an identifiable test icon for testing purposes
      icon = <PlayIcon testId="playIcon" fill="#FFFFFF" />;
      break;

    case "pause":
      icon = <PauseIcon fill="#FFFFFF" />;
      break;

    default:
      break;
  }

  return icon;
};

export const VideoControlIndicator = ({
  ariaLabel,
  controlAction,
  triggerAnimation,
}: VideoControlIndicatorProps) => {
  return (
    <div
      className={`${styles.container} ${
        triggerAnimation ? styles.triggerAnimation : styles.hide
      }`}
      role="status"
      aria-label={ariaLabel}
    >
      <div className={styles.iconWrapper}>{selectIcon(controlAction)}</div>
    </div>
  );
};

// Animation 500 ms linear, scale + opacity
