import { Player } from "features/players";
import * as React from "react";
import styles from "features/players/components/styles/VideoSettings.module.css";
import ArrowBackIcon from "icons/ArrowBackIcon";
import TickIcon from "icons/TickIcon";
import { qualityNamesMap } from "features/players/utils/qualityNamesMap";

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
    <div className={`${styles.menu} ${styles.subMenu}`}>
      <div className={styles.subMenuHeader}>
        <span className={styles.subMenuTitle}>Quality</span>
        <button
          data-testid="backButton"
          className={styles.backButton}
          onClick={(event) => {
            closeSelf();
            // This registers as an outside click despite clearly having the required ancestor. I cannot figure out why this is the case. The quick fix is stopping propagation.
            event.stopPropagation();
          }}
        >
          <ArrowBackIcon className={styles.backIcon} />
        </button>
      </div>
      <div role="menu" ref={innerRef}>
        {player.getQualities().map((quality) => (
          <button
            className={`${styles.menuButton} ${styles.subMenuButton}`}
            key={quality.name}
            role="menuitem"
            onClick={() => {
              player.setQuality(quality.level);
              closePrimaryMenu();
            }}
            onKeyDown={(event) =>
              handleSubMenuKeyDown(event, () => closeSelf())
            }
          >
            {player.getQuality() === quality.name ? (
              <div>
                <TickIcon fill="#FFFFFF" className={styles.selectedIcon} />
                <span>{qualityNamesMap[quality.level]}</span>
              </div>
            ) : (
              <span>{qualityNamesMap[quality.level]}</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};
