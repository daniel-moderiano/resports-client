import { Player } from "features/players/api/player";
import { useState } from "react";

interface VolumeSliderProps {
  getPlayerVolume: () => number;
  setPlayerVolume: () => void;
}

export const VolumeSlider = () => {
  const [volume, setVolume] = useState(100);

  return (
    <input
      type="range"
      min={0}
      max={100}
      step={1}
      value={volume}
      onChange={(event) => setVolume(event.target.valueAsNumber)}
    />
  );
};
