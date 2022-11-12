import { useKeyboardNavigation } from "hooks/useKeyboardMenuNavigation";
import { useMenuCloseEvents } from "hooks/useMenuCloseEvents";
import { Player } from "../api/player";

interface VideoSettingsProps {
  closeMenu: () => void;
  player: Player;
}

// Currently this menu only supports quality settings, but may be adapted later to include playback rate and caption settings
export const VideoSettings = ({ closeMenu, player }: VideoSettingsProps) => {
  // Handles typical accessibility and UX concerns
  useMenuCloseEvents("settingsMenu", closeMenu);
  useKeyboardNavigation("settingsMenu");

  return (
    <ul
      id="settingsMenu"
      data-id="settingsMenu"
      role="menu"
      aria-label="Video settings menu"
      data-testid="settingsMenu"
    >
      {player.getQualities().map((quality) => (
        <li role="none" key={quality.name}>
          <button
            role="menuitem"
            onClick={() => {
              player.setQuality(quality.level);
              closeMenu();
            }}
          >
            {/* Indicate the source quality option for the user*/}
            {quality.level === "chunked"
              ? `${quality.name} (Source)`
              : `${quality.name}`}
          </button>
        </li>
      ))}
    </ul>
  );
};
