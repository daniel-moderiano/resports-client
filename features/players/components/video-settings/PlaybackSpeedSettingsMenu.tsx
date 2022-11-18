import { Player } from "features/players";
import { useKeyboardNavigation } from "hooks/useKeyboardMenuNavigation";

interface PlaybackSpeedSettingsMenuProps {
  player: Player;
  closeSelf: () => void;
  closePrimaryMenu: () => void;
}

export const PlaybackSpeedSettingsMenu = ({
  player,
  closeSelf,
  closePrimaryMenu,
}: PlaybackSpeedSettingsMenuProps) => {
  const { menuRef: playbackSpeedSubMenu } = useKeyboardNavigation();

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
    <div role="menu" ref={playbackSpeedSubMenu}>
      {player.getAvailablePlaybackSpeeds().map((speed) => (
        <button
          key={speed}
          role="menuitem"
          tabIndex={-1}
          onClick={() => {
            player.setPlaybackSpeed(speed);
            closePrimaryMenu();
          }}
          onKeyDown={(event) => handleSubMenuKeyDown(event, () => closeSelf())}
        >
          {speed}
        </button>
      ))}
    </div>
  );
};
