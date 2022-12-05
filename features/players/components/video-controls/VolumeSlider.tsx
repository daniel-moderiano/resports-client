import styles from "features/players/components/styles/VolumeSlider.module.css";
import { Player } from "features/players/api/player";
import { useEffect, useState } from "react";

interface VolumeSliderProps {
  player: Player;
}

export const VolumeSlider = ({ player }: VolumeSliderProps) => {
  const [volume, setVolume] = useState(0);
  const currentPlayerVolume = player.getVolume();

  // Synchronise the local volume state with player volume
  useEffect(() => {
    setVolume(currentPlayerVolume);
  }, [currentPlayerVolume]);

  return (
    <>
      <div className={styles.inputContainer}>
        <div className={styles.progress}></div>
        <input
          type="range"
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
        />
      </div>

      {/* <div
        role="slider"
        className={styles.customSlider}
        tabIndex={0}
        aria-valuenow={0.292}
        aria-valuetext="29% volume"
        aria-label="Volume (use up/down arrow keys to change)"
        aria-valuemin={0}
        aria-valuemax={1}
        // style="display: none;"
      >
        <div className={styles.volumeBar}>
          <div
            className={styles.volumeBarFill}
            // style="height: 29.2%;"
          ></div>
          <div
            className={styles.sliderHandle}
            // style="bottom: 29.2%;"
          ></div>
        </div>
      </div> */}
    </>
  );
};
