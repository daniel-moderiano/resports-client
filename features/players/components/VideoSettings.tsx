import { useKeyboardNavigation } from "hooks/useKeyboardMenuNavigation";
import { useMenuCloseEvents } from "hooks/useMenuCloseEvents";
import { Player } from "features/players";
import { useState } from "react";
import { QualitySettingsMenu } from "./video-settings/QualitySettingsMenu";
import { PlaybackSpeedSettingsMenu } from "./video-settings/PlaybackSpeedSettingsMenu";

interface VideoSettingsProps {
  closeMenu: () => void;
  player: Player;
}

// Currently this menu only supports quality settings, but may be adapted later to include playback rate and caption settings
export const VideoSettings = ({ closeMenu, player }: VideoSettingsProps) => {
  // Handles typical accessibility and UX concerns
  useMenuCloseEvents("settingsMenuContainer", closeMenu);
  const { menuRef: primaryMenu } = useKeyboardNavigation();

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
            <QualitySettingsMenu
              player={player}
              closeSelf={() => setShowQualityMenu(false)}
              closePrimaryMenu={closeMenu}
            />
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
            <PlaybackSpeedSettingsMenu
              player={player}
              closeSelf={() => setShowPlaybackSpeedMenu(false)}
              closePrimaryMenu={closeMenu}
            />
          )}
        </div>
      )}
    </div>
  );
};
