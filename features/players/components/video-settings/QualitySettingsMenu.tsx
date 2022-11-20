import { Player } from "features/players";
import * as React from "react";
import styles from "features/players/components/styles/VideoSettings.module.css";

interface QualitySettingsMenuProps {
  player: Player;
  closeSelf: () => void;
  closePrimaryMenu: () => void;
  innerRef: React.MutableRefObject<HTMLDivElement | null>;
}

export const QualitySettingsMenu = ({
  player,
  closeSelf,
  closePrimaryMenu,
  innerRef,
}: QualitySettingsMenuProps) => {
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
    <div
      role="menu"
      ref={innerRef}
      className={`${styles.menu}  ${styles.subMenu}`}
    >
      {player.getQualities().map((quality) => (
        <button
          className={`${styles.menuButton}`}
          key={quality.name}
          role="menuitem"
          onClick={() => {
            player.setQuality(quality.level);
            closePrimaryMenu();
          }}
          onKeyDown={(event) => handleSubMenuKeyDown(event, () => closeSelf())}
        >
          {quality.name}
        </button>
      ))}
    </div>
  );
};
