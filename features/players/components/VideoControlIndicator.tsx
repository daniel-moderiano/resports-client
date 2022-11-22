import styles from "features/players/components/styles/VideoControlIndicator.module.css";
import MutedIcon from "icons/MutedIcon";
import PauseIcon from "icons/PauseIcon";
import PlayIcon from "icons/PlayIcon";
import VolumeDownIcon from "icons/VolumeDownIcon";
import VolumeIcon from "icons/VolumeIcon";
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
