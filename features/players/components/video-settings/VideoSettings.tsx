import { useKeyboardNavigation } from "hooks/useKeyboardMenuNavigation";
import { useMenuCloseEvents } from "hooks/useMenuCloseEvents";
import { Player } from "features/players";
import { useState } from "react";
import { QualitySettingsMenu } from "./QualitySettingsMenu";
import { PlaybackSpeedSettingsMenu } from "./PlaybackSpeedSettingsMenu";
import * as React from "react";
import styles from "features/players/components/styles/VideoSettings.module.css";
import ArrowBackIcon from "icons/ArrowBackIcon";
import { qualityNamesMap } from "features/players/utils/qualityNamesMap";

interface VideoSettingsProps {
  closeMenu: () => void;
  player: Player;
}

// Currently this menu only supports quality settings, but may be adapted later to include playback rate and caption settings
export const VideoSettings = ({ closeMenu, player }: VideoSettingsProps) => {
  // Handles typical accessibility and UX concerns
  useMenuCloseEvents("settingsMenuContainer", closeMenu);
  const primaryMenu = React.useRef<HTMLDivElement | null>(null);
  const playbackSpeedMenu = React.useRef<HTMLDivElement | null>(null);
  const qualityMenu = React.useRef<HTMLDivElement | null>(null);

  const [showPlaybackSpeedMenu, setShowPlaybackSpeedMenu] = useState(false);
  const [showQualityMenu, setShowQualityMenu] = useState(false);
  const [currentlyFocusedMenu, setCurrentlyFocusedMenu] =
    React.useState(primaryMenu);

  React.useEffect(() => {
    if (showQualityMenu) {
      setCurrentlyFocusedMenu(qualityMenu);
    } else if (showPlaybackSpeedMenu) {
      setCurrentlyFocusedMenu(playbackSpeedMenu);
    } else {
      setCurrentlyFocusedMenu(primaryMenu);
    }
  }, [showPlaybackSpeedMenu, showQualityMenu]);

  useKeyboardNavigation(currentlyFocusedMenu);

  const handlePrimaryMenuKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    callback: () => void
  ) => {
    if (event.key === "ArrowRight") {
      callback();
    }

    return;
  };

  return (
    <div
      id="settingsMenu"
      role="menu"
      aria-label="Video settings menu"
      data-testid="settingsMenu"
      ref={primaryMenu}
      className={`${styles.menu} ${styles.primaryMenu}`}
    >
      <div>
        <button
          className={`${styles.menuButton} ${
            currentlyFocusedMenu !== primaryMenu ? styles.hideButton : ""
          }`}
          role="menuitem"
          aria-haspopup="true"
          aria-expanded={showQualityMenu}
          onClick={() => {
            setShowQualityMenu((prevState) => !prevState);
          }}
          onKeyDown={(event) =>
            handlePrimaryMenuKeyDown(event, () => {
              setShowQualityMenu(true);
            })
          }
          disabled={!player.hasQualitySettings()}
        >
          <span>Quality</span>
          <div className={styles.currentDataContainer}>
            <span className={styles.currentData} data-testid="currentQuality">
              {qualityNamesMap[player.getQuality()]}
            </span>
            {player.hasQualitySettings() && (
              <ArrowBackIcon className={styles.forwardIcon} />
            )}
          </div>
        </button>
        {showQualityMenu && (
          <QualitySettingsMenu
            player={player}
            closeSelf={() => setShowQualityMenu(false)}
            closePrimaryMenu={closeMenu}
            innerRef={qualityMenu}
          />
        )}
      </div>

      <div>
        <button
          className={`${styles.menuButton} ${
            currentlyFocusedMenu !== primaryMenu ? styles.hideButton : ""
          }`}
          role="menuitem"
          aria-haspopup="true"
          aria-expanded={showPlaybackSpeedMenu}
          onClick={() => setShowPlaybackSpeedMenu((prevState) => !prevState)}
          onKeyDown={(event) =>
            handlePrimaryMenuKeyDown(event, () => {
              setShowPlaybackSpeedMenu(true);
            })
          }
          disabled={!player.hasPlaybackSpeedSettings()}
        >
          <span>Playback speed</span>
          <div className={styles.currentDataContainer}>
            <span className={styles.currentData} data-testid="currentPlayback">
              {player.getPlaybackSpeed() === 1
                ? "Normal"
                : `${player.getPlaybackSpeed()}x`}
            </span>
            {player.hasPlaybackSpeedSettings() && (
              <ArrowBackIcon className={styles.forwardIcon} />
            )}
          </div>
        </button>
        {showPlaybackSpeedMenu && (
          <PlaybackSpeedSettingsMenu
            player={player}
            closeSelf={() => setShowPlaybackSpeedMenu(false)}
            closePrimaryMenu={closeMenu}
            innerRef={playbackSpeedMenu}
          />
        )}
      </div>
    </div>
  );
};
