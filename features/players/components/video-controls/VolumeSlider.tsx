import styles from "features/players/components/styles/VolumeSlider.module.css";
import { Player } from "features/players/api/player";
import { useEffect, useState } from "react";

interface VolumeSliderProps extends React.HTMLAttributes<HTMLDivElement> {
  player: Player;
  showVolumeSlider: boolean;
}

export const VolumeSlider = ({
  player,
  showVolumeSlider,
  ...props
}: VolumeSliderProps) => {
  const [volume, setVolume] = useState(0);
  const currentPlayerVolume = player.getVolume();

  // Synchronise the local volume state with player volume
  useEffect(() => {
    setVolume(currentPlayerVolume);
  }, [currentPlayerVolume]);

  return (
    <div
      className={`${styles.inputContainer} ${
        showVolumeSlider ? styles.show : styles.hide
      }`}
      onMouseLeave={props.onMouseLeave}
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
        data-testid="slider"
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
