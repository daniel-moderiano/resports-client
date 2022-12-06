import styles from "features/players/components/styles/VolumeSlider.module.css";
import { Player } from "features/players/api/player";
import { useEffect, useState } from "react";

interface VolumeSliderProps extends React.HTMLAttributes<HTMLDivElement> {
  player: Player;
  showVolumeSlider?: boolean;
}

export const VolumeSlider = ({
  player,
  showVolumeSlider,
  ...props
}: VolumeSliderProps) => {
  const [volume, setVolume] = useState(0);
  const [show, setShow] = useState(true);
  const currentPlayerVolume = player.getVolume();
  const playerMuted = player.getMuted();

  // Synchronise the local volume state with player volume
  useEffect(() => {
    if (playerMuted) {
      setVolume(0);
    } else {
      setVolume(currentPlayerVolume);
    }
  }, [playerMuted, currentPlayerVolume]);

  useEffect(() => {
    if (showVolumeSlider) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [showVolumeSlider]);

  return (
    <div
      className={`${styles.inputContainer} ${show ? styles.show : styles.hide}`}
      onMouseLeave={props.onMouseLeave}
      data-testid="slider"
      onFocus={() => setShow(true)}
      onBlur={() => setShow(false)}
    >
      <div className={styles.progress} style={{ width: `${volume}%` }}></div>
      <input
        type="range"
        id="volume"
        min={0}
        max={100}
        step={1}
        value={volume}
        onChange={(event) => {
          setVolume(event.target.valueAsNumber);
          player.setVolume(event.target.valueAsNumber);
        }}
        className={styles.slider}
        onKeyDown={(event) => {
          if (event.key === "ArrowUp" || event.key === "ArrowRight") {
            setVolume(Math.min(volume + 5, 100));
            player.setVolume(volume + 5);
          } else if (event.key === "ArrowDown" || event.key === "ArrowLeft") {
            setVolume(Math.max(volume - 5, 0));
            player.setVolume(volume - 5);
          } else {
            return;
          }
        }}
      />
      <label className={styles.visuallyHidden} htmlFor="volume">
        Volume
      </label>
    </div>
  );
};
