import { Player } from "features/players";
import * as React from "react";

interface QualitySettingsMenuProps {
  player: Player;
  closeSelf: () => void;
  closePrimaryMenu: () => void;
}

export const QualitySettingsMenu = React.forwardRef(
  (
    { player, closeSelf, closePrimaryMenu }: QualitySettingsMenuProps,
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
        {player.getQualities().map((quality) => (
          <button
            key={quality.name}
            role="menuitem"
            tabIndex={-1}
            onClick={() => {
              player.setQuality(quality.level);
              closePrimaryMenu();
            }}
            onKeyDown={(event) =>
              handleSubMenuKeyDown(event, () => closeSelf())
            }
          >
            {quality.name}
          </button>
        ))}
      </div>
    );
  }
);

QualitySettingsMenu.displayName = "QualitySettingsMenu";
