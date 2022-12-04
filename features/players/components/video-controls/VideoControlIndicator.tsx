import styles from "features/players/components/styles/VideoControlIndicator.module.css";
import MutedIcon from "icons/MutedIcon";
import PauseIcon from "icons/PauseIcon";
import PlayIcon from "icons/PlayIcon";
import VolumeDownIcon from "icons/VolumeDownIcon";
import VolumeIcon from "icons/VolumeIcon";
import { ControlAction } from "features/players/types/playerTypes";
import * as React from "react";

interface VideoControlIndicatorProps {
  ariaLabel: string | null;
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

  // For volume adjustments, the aria label will be on a separate volume indicator and shouldn't be duplicated elsewhere
  const ariaLabelRequired = () => {
    return !(controlAction == "volumeDown" || controlAction === "volumeUp");
  };

  // Conceptually it makes sense to trigger the indicator animation with an effect.
  React.useEffect(() => {
    if (indicator.current === null) {
      return;
    }
    if (triggerAnimation) {
      indicator.current.classList.remove(styles.triggerAnimation);
      // This triggers browser reflow, which is the only way to restart the CSS animation. It is a costly operation however, so keep this in mind if performance issues appear.
      void indicator.current.offsetWidth;
      indicator.current.classList.add(styles.triggerAnimation);
    }
  }, [triggerAnimation]);

  const handleAnimationEnd = (event: React.AnimationEvent<HTMLDivElement>) => {
    event.currentTarget.classList.remove(styles.triggerAnimation);
  };

  return (
    <div
      className={`${styles.container} ${
        document.fullscreenElement ? styles.large : ""
      }`}
      role="status"
      aria-label={
        ariaLabelRequired() && ariaLabel !== null ? ariaLabel : undefined
      }
      ref={indicator}
      onAnimationEnd={handleAnimationEnd}
    >
      <div
        className={`${styles.iconWrapper} ${
          document.fullscreenElement ? styles.iconLarge : ""
        }`}
      >
        {selectIcon(controlAction)}
      </div>
    </div>
  );
};
