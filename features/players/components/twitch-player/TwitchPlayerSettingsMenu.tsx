import { PlayerWrapper } from "features/players/types/playerInterfaceTypes";
import { useKeyboardNavigation } from "hooks/useKeyboardMenuNavigation";
import { useMenuCloseEvents } from "hooks/useMenuCloseEvents";

interface TwitchPlayerSettingsMenuProps {
  closeMenu: () => void;
  player: PlayerWrapper;
}

// Currently this menu only supports quality settings, but may be adapted later to include playback rate and caption settings
export const TwitchPlayerSettingsMenu = ({
  closeMenu,
  player,
}: TwitchPlayerSettingsMenuProps) => {
  // Handles typical accessibility and UX concerns
  // useMenuCloseEvents("twitchSettingsMenu", closeMenu);
  // useKeyboardNavigation("twitchSettingsMenu");

  console.log(player.getQualities());

  return (
    <ul
      id="twitchSettingsMenu"
      data-id="twitchSettingsMenu"
      role="menu"
      aria-label="Video settings menu"
      data-testid="twitchSettingsMenu"
    >
      {player.getQualities().map((quality) => (
        <li role="none" key={quality}>
          <button
            role="menuitem"
            onClick={() => {
              player.setQuality(quality);
              closeMenu();
            }}
          >
            {quality}
          </button>
        </li>
      ))}
    </ul>
  );
};
