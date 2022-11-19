import { Player } from "features/players";

interface PlaybackSpeedSettingsMenuProps {
  player: Player;
  closeSelf: () => void;
  closePrimaryMenu: () => void;

  ref: React.MutableRefObject<HTMLDivElement | null>;
}

export const PlaybackSpeedSettingsMenu = ({
  player,
  closeSelf,
  closePrimaryMenu,
  ref,
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
    <div role="menu" ref={ref}>
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
