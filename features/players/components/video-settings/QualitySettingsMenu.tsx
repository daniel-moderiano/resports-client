import { Player } from "features/players";
import { useKeyboardNavigation } from "hooks/useKeyboardMenuNavigation";

interface QualitySettingsMenuProps {
  player: Player;
  closeSelf: () => void;
  closePrimaryMenu: () => void;
}

export const QualitySettingsMenu = ({
  player,
  closeSelf,
  closePrimaryMenu,
}: QualitySettingsMenuProps) => {
  const { menuRef: qualitySubMenu } = useKeyboardNavigation();

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
    <div role="menu" ref={qualitySubMenu}>
      {player.getQualities().map((quality) => (
        <button
          key={quality.name}
          role="menuitem"
          tabIndex={-1}
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
