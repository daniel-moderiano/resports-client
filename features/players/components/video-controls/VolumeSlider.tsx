import styles from "features/players/components/styles/VolumeSlider.module.css";
import buttonStyles from "features/players/components/styles/ControlButton.module.css";
import { Player } from "features/players/api/player";
import { useEffect, useState } from "react";
import * as React from "react";

interface VolumeSliderProps extends React.HTMLAttributes<HTMLDivElement> {
  player: Player;
  showVolumeSlider?: boolean;
  setPlayerMuted: React.Dispatch<React.SetStateAction<boolean>>;
  signalUserActivity: () => void;
  playerMuted: boolean;
  localVolume: number;
  setLocalVolume: React.Dispatch<React.SetStateAction<number>>;
}

export const VolumeSlider = ({
  player,
  showVolumeSlider,
  setPlayerMuted,
  signalUserActivity,
  playerMuted,
  localVolume,
  setLocalVolume,
  ...props
}: VolumeSliderProps) => {
  const [show, setShow] = useState(true);
  const sliderRef = React.useRef<HTMLInputElement | null>(null);

  const volumeBarRef = React.useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (volumeBarRef.current) {
      volumeBarRef.current.style.width = playerMuted ? "0" : `${localVolume}%`;
    }
  }, [localVolume, playerMuted]);

  useEffect(() => {
    if (!showVolumeSlider && document.activeElement !== sliderRef.current) {
      setShow(false);
    } else {
      setShow(true);
    }
  }, [showVolumeSlider]);

  return (
    <div
      className={`${styles.inputContainer} ${show ? styles.show : styles.hide}`}
      data-testid="slider"
    >
      <div
        className={styles.progress}
        // style={{ width: `${playerMuted ? 0 : localVolume}%` }}
        ref={volumeBarRef}
      ></div>
      <input
        type="range"
        id="volume"
        min={0}
        max={100}
        step={1}
        ref={sliderRef}
        value={playerMuted ? 0 : localVolume}
        onBlur={(event) => {
          if (
            event.relatedTarget?.classList.contains(buttonStyles.button) ||
            event.relatedTarget?.id === "wrapper"
          ) {
            if (!showVolumeSlider) {
              setShow(false);
            }
          }
        }}
        onFocus={() => setShow(true)}
        onChange={(event) => {
          if (playerMuted && event.target.valueAsNumber > 0) {
            player.setMuted(false);
            setPlayerMuted(false);
          }
          if (event.target.valueAsNumber === 0) {
            player.setMuted(true);
            setPlayerMuted(true);
          }
          setLocalVolume(event.target.valueAsNumber);
          signalUserActivity();
        }}
        className={styles.slider}
        onKeyDown={(event) => {
          if (event.key === "ArrowUp" || event.key === "ArrowRight") {
            setLocalVolume(Math.min(localVolume + 5, 100));
          } else if (event.key === "ArrowDown" || event.key === "ArrowLeft") {
            setLocalVolume(Math.max(localVolume - 5, 0));
          } else {
            return;
          }

          if (playerMuted && localVolume > 0) {
            player.setMuted(false);
            setPlayerMuted(false);
          }

          if (localVolume === 0) {
            player.setMuted(true);
            setPlayerMuted(true);
          }
        }}
      />
      <label className={styles.visuallyHidden} htmlFor="volume">
        Volume
      </label>
    </div>
  );
};
