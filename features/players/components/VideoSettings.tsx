import { useKeyboardNavigation } from "hooks/useKeyboardMenuNavigation";
import { useMenuCloseEvents } from "hooks/useMenuCloseEvents";
import { Player } from "features/players";
import { useState } from "react";

interface VideoSettingsProps {
  closeMenu: () => void;
  player: Player;
}

// Currently this menu only supports quality settings, but may be adapted later to include playback rate and caption settings
export const VideoSettings = ({ closeMenu, player }: VideoSettingsProps) => {
  // Handles typical accessibility and UX concerns
  useMenuCloseEvents("settingsMenuContainer", closeMenu);
  const { menuRef: primaryMenu } = useKeyboardNavigation();
  const { menuRef: qualitySubMenu } = useKeyboardNavigation();
  const { menuRef: playbackSpeedSubMenu } = useKeyboardNavigation();

  const [showPlaybackSpeedMenu, setShowPlaybackSpeedMenu] = useState(false);
  const [showQualityMenu, setShowQualityMenu] = useState(false);

  const handlePrimaryMenuKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    callback: () => void
  ) => {
    if (event.key === "ArrowRight") {
      callback();
    }

    return;
  };

  const handleSubMenuKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    callback: () => void
  ) => {
    if (event.key === "ArrowLeft") {
      callback();
    }

    return;
  };

  const qualityMenuItems = player.getQualities().map((quality) => (
    <button
      key={quality.name}
      role="menuitem"
      tabIndex={-1}
      onClick={() => {
        player.setQuality(quality.level);
        closeMenu();
      }}
      onKeyDown={(event) =>
        handleSubMenuKeyDown(event, () => setShowQualityMenu(false))
      }
    >
      {quality.name}
    </button>
  ));

  const playbackMenuItems = player.getAvailablePlaybackSpeeds().map((speed) => (
    <button
      key={speed}
      role="menuitem"
      tabIndex={-1}
      onClick={() => {
        player.setPlaybackSpeed(speed);
        closeMenu();
      }}
      onKeyDown={(event) =>
        handleSubMenuKeyDown(event, () => setShowPlaybackSpeedMenu(false))
      }
    >
      {speed}
    </button>
  ));

  return (
    <div
      id="settingsMenu"
      role="menu"
      aria-label="Video settings menu"
      data-testid="settingsMenu"
      ref={primaryMenu}
    >
      {player.hasQualitySettings() && (
        <div>
          <button
            role="menuitem"
            aria-haspopup="true"
            aria-expanded={showQualityMenu}
            onClick={() => {
              setShowQualityMenu((prevState) => !prevState);
            }}
            onKeyDown={(event) =>
              handlePrimaryMenuKeyDown(event, () => setShowQualityMenu(true))
            }
          >
            Quality
          </button>
          {showQualityMenu && (
            <div role="menu" ref={qualitySubMenu}>
              {qualityMenuItems}
            </div>
          )}
        </div>
      )}
      {player.hasPlaybackSpeedSettings() && (
        <div>
          <button
            role="menuitem"
            aria-haspopup="true"
            aria-expanded={showPlaybackSpeedMenu}
            onClick={() => setShowPlaybackSpeedMenu((prevState) => !prevState)}
            onKeyDown={(event) =>
              handlePrimaryMenuKeyDown(event, () =>
                setShowPlaybackSpeedMenu(true)
              )
            }
          >
            Playback speed
          </button>
          {showPlaybackSpeedMenu && (
            <div role="menu" ref={playbackSpeedSubMenu}>
              {playbackMenuItems}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
