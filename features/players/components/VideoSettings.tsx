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
    <ul
      id="settingsMenu"
      data-id="settingsMenu"
      role="menu"
      aria-label="Video settings menu"
      data-testid="settingsMenu"
    >
      {player.hasQualitySettings() && (
        <li>
          <button role="menuitem">Quality</button>
          <ul>
            {player.getQualities().map((quality) => (
              <li role="none" key={quality.name}>
                <button
                  role="menuitem"
                  onClick={() => {
                    player.setQuality(quality.level);
                    closeMenu();
                  }}
                >
                  {quality.name}
                </button>
              </li>
            ))}
          </ul>
        </li>
      )}
      {player.hasPlaybackSpeedSettings() && (
        <li>
          <button role="menuitem">Playback Speed</button>
          <ul>
            {player.getAvailablePlaybackSpeeds().map((speed) => (
              <li role="none" key={speed}>
                <button
                  role="menuitem"
                  onClick={() => {
                    player.setPlaybackSpeed(speed);
                    closeMenu();
                  }}
                >
                  {speed}
                </button>
              </li>
            ))}
          </ul>
        </li>
      )}
    </ul>
  );
};
