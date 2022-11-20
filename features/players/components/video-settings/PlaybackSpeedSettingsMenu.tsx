import { Player } from "features/players";
import * as React from "react";

interface PlaybackSpeedSettingsMenuProps {
  player: Player;
  closeSelf: () => void;
  closePrimaryMenu: () => void;
  innerRef: React.MutableRefObject<HTMLDivElement | null>;
}

export const PlaybackSpeedSettingsMenu = ({
  player,
  closeSelf,
  closePrimaryMenu,
  innerRef,
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
    <div role="menu" ref={innerRef}>
      {player.getAvailablePlaybackSpeeds().map((speed) => (
        <button
          key={speed}
          role="menuitem"
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
