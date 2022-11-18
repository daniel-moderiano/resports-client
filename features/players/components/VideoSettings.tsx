import { useKeyboardNavigation } from "hooks/useKeyboardMenuNavigation";
import { useMenuCloseEvents } from "hooks/useMenuCloseEvents";
import { Player } from "features/players";

interface VideoSettingsProps {
  closeMenu: () => void;
  player: Player;
}

// Currently this menu only supports quality settings, but may be adapted later to include playback rate and caption settings
export const VideoSettings = ({ closeMenu, player }: VideoSettingsProps) => {
  // Handles typical accessibility and UX concerns
  useMenuCloseEvents("settingsMenu", closeMenu);
  // useKeyboardNavigation("settingsMenu");

  return (
    <div
      id="settingsMenu"
      data-id="settingsMenu"
      role="menu"
      aria-label="Video settings menu"
      data-testid="settingsMenu"
    >
      {player.hasQualitySettings() && (
        <div>
          <button role="menuitem" aria-haspopup="true">
            Quality
          </button>
          <div role="menu">
            {player.getQualities().map((quality) => (
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
            ))}
          </div>
        </div>
      )}
      {player.hasPlaybackSpeedSettings() && (
        <div>
          <button role="menuitem" aria-haspopup="true">
            Quality
          </button>
          <div role="menu">
            {player.getAvailablePlaybackSpeeds().map((speed) => (
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
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
