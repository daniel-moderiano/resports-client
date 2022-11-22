import styles from "features/players/components/styles/VideoControlIndicator.module.css";
import PlayIcon from "icons/PlayIcon";
import { ControlAction } from "./VideoPlayer";

interface VideoControlIndicatorProps {
  ariaLabel: string;
  controlAction: ControlAction;
  triggerAnimation: boolean;
}

const selectIcon = (action: ControlAction) => {
  let icon: JSX.Element | null = null;

  switch (action) {
    case "play":
      icon = <PlayIcon testId="playIcon" />;
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
