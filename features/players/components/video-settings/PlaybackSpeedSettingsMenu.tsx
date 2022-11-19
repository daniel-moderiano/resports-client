import { Player } from "features/players";
import * as React from "react";

interface PlaybackSpeedSettingsMenuProps {
  player: Player;
  closeSelf: () => void;
  closePrimaryMenu: () => void;
}

export const PlaybackSpeedSettingsMenu = React.forwardRef(
  (
    { player, closeSelf, closePrimaryMenu }: PlaybackSpeedSettingsMenuProps,
    ref: React.ForwardedRef<HTMLDivElement>
  ) => {
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
            onClick={() => {
              player.setPlaybackSpeed(speed);
              closePrimaryMenu();
            }}
            onKeyDown={(event) =>
              handleSubMenuKeyDown(event, () => closeSelf())
            }
          >
            {speed}
          </button>
        ))}
      </div>
    );
  }
);

PlaybackSpeedSettingsMenu.displayName = "PlaybackSpeedSettingsMenu";
