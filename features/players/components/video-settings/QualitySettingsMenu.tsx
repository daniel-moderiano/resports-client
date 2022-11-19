import { Player } from "features/players";

interface QualitySettingsMenuProps {
  player: Player;
  closeSelf: () => void;
  closePrimaryMenu: () => void;
  ref: React.MutableRefObject<HTMLDivElement | null>;
}

export const QualitySettingsMenu = ({
  player,
  closeSelf,
  closePrimaryMenu,
  ref,
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
          onKeyDown={(event) => handleSubMenuKeyDown(event, () => closeSelf())}
        >
          {quality.name}
        </button>
      ))}
    </div>
  );
};
