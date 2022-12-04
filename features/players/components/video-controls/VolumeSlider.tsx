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
  );
};
