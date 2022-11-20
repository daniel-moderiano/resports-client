import { Player } from "features/players";
import * as React from "react";
import styles from "features/players/components/styles/VideoSettings.module.css";
import ArrowBackIcon from "icons/ArrowBackIcon";

interface PlaybackSpeedSettingsMenuProps {
  player: Player;
  closeSelf: () => void;
  closePrimaryMenu: () => void;
  innerRef: React.MutableRefObject<HTMLDivElement | null>;
}

export const PlaybackSpeedSettingsMenu = ({
  player,
  closeSelf,
  closePrimaryMenu,
  innerRef,
}: PlaybackSpeedSettingsMenuProps) => {
  const handleSubMenuKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    callback: () => void
  ) => {
    if (event.key === "ArrowLeft") {
      callback();
    }

    return;
  };

  return (
    <div className={`${styles.menu} ${styles.subMenu}`}>
      <div className={styles.subMenuHeader}>
        <span className={styles.subMenuTitle}>Playback speed</span>
        <button
          data-testid="backButton"
          className={styles.backButton}
          onClick={(event) => {
            closeSelf();
            // This registers as an outside click despite clearly having the required ancestor. I cannot figure out why this is the case. The quick fix is stopping propagation.
            event.stopPropagation();
          }}
        >
          <ArrowBackIcon className={styles.backIcon} />
        </button>
      </div>
      <div role="menu" ref={innerRef}>
        {player.getAvailablePlaybackSpeeds().map((speed) => (
          <button
            className={styles.menuButton}
            key={speed}
            role="menuitem"
            onClick={() => {
              player.setPlaybackSpeed(speed);
              closePrimaryMenu();
            }}
            onKeyDown={(event) =>
              handleSubMenuKeyDown(event, () => closeSelf())
            }
          >
            {speed}
          </button>
        ))}
      </div>
    </div>
  );
};
