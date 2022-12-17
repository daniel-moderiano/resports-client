import * as React from "react";
import { useTwitchPlayer } from "features/players/api/useTwitchPlayer";
import { VideoPlayer } from "features/players";

interface TwitchPlayerProps {
  videoId: string;
  disableControls: boolean;
}

export const TwitchPlayer = ({
  videoId,
  disableControls,
}: TwitchPlayerProps) => {
  const { player } = useTwitchPlayer(videoId);

  return <VideoPlayer player={player} disableControls={disableControls} />;
};
