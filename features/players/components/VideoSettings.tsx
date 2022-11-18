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
  // useKeyboardNavigation("settingsMenu");
  const [showPlaybackSpeedMenu, setShowPlaybackSpeedMenu] = useState(false);
  const [showQualityMenu, setShowQualityMenu] = useState(false);

  const qualityMenuItems = player.getQualities().map((quality) => (
    <button
      key={quality.name}
      role="menuitem"
      tabIndex={-1}
      onClick={() => {
        player.setQuality(quality.level);
        closeMenu();
      }}
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
          >
            Quality
          </button>
          {showQualityMenu && <div role="menu">{qualityMenuItems}</div>}
        </div>
      )}
      {player.hasPlaybackSpeedSettings() && (
        <div>
          <button
            role="menuitem"
            aria-haspopup="true"
            aria-expanded={showPlaybackSpeedMenu}
            onClick={() => setShowPlaybackSpeedMenu((prevState) => !prevState)}
          >
            Playback speed
          </button>
          {showPlaybackSpeedMenu && <div role="menu">{playbackMenuItems}</div>}
        </div>
      )}
    </div>
  );
};
