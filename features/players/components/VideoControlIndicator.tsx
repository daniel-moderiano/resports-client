import styles from "features/players/components/styles/VideoControlIndicator.module.css";
import MutedIcon from "icons/MutedIcon";
import PauseIcon from "icons/PauseIcon";
import PlayIcon from "icons/PlayIcon";
import VolumeDownIcon from "icons/VolumeDownIcon";
import VolumeIcon from "icons/VolumeIcon";
import { ControlAction } from "./VideoPlayer";
import * as React from "react";
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
      icon = <PlayIcon testId="playIndicator" fill="#FFFFFF" />;
      break;

    case "pause":
      icon = <PauseIcon fill="#FFFFFF" />;
      break;

    case "mute":
      icon = <MutedIcon fill="#FFFFFF" />;
      break;

    case "unmute":
      icon = <VolumeIcon fill="none" />;
      break;

    case "volumeDown":
      icon = <VolumeDownIcon fill="#FFFFFF" />;
      break;

    case "volumeUp":
      icon = <VolumeIcon fill="none" />;
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
  const indicator = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (!indicator.current || !triggerAnimation) {
      return;
    }

    indicator.current.classList.remove(styles.triggerAnimation);
    // Triggers browser reflow, which is the only way to restart the CSS animation
    void indicator.current.offsetWidth;
    indicator.current.classList.add(styles.triggerAnimation);
  }, [triggerAnimation]);

  const handleAnimationEnd = () => {
    if (!indicator.current) {
      return;
    }
    indicator.current.classList.remove(styles.triggerAnimation);
  };
  return (
    <div
      className={`${styles.container}`}
      role="status"
      aria-label={ariaLabel}
      ref={indicator}
      onAnimationEnd={handleAnimationEnd}
    >
      <div className={styles.iconWrapper}>{selectIcon(controlAction)}</div>
    </div>
  );
};
