import * as React from "react";
import { useTwitchPlayer } from "features/players/api/useTwitchPlayer";
import { VideoPlayer } from "features/players";

interface TwitchPlayerProps {
  videoId: string;
}

export const TwitchPlayer = ({ videoId }: TwitchPlayerProps) => {
  // The user should be able to manually disable the overlay to interact with the player in certain circumstances, e.g. mature content, reloading player, etc.
  const [disableControls, setDisableControls] = React.useState(false);
  const { player } = useTwitchPlayer(videoId);

  return (
    <div>
      <VideoPlayer player={player} disableControls={disableControls} />
      <button onClick={() => setDisableControls((prevState) => !prevState)}>
        Toggle custom controls
      </button>
    </div>
  );
};
