import * as React from "react";
import { useTwitchPlayer } from "features/players/api/useTwitchPlayer";
import { VideoPlayer } from "features/players";
import { TwitchVideo } from "features/channels";

interface TwitchPlayerProps {
  videoId: string;
  disableControls: boolean;
  videoData: TwitchVideo | undefined | null;
}

export const TwitchPlayer = ({
  videoId,
  disableControls,
  videoData,
}: TwitchPlayerProps) => {
  const { player } = useTwitchPlayer(videoId);

  return (
    <VideoPlayer
      player={player}
      disableControls={disableControls}
      videoData={videoData}
    />
  );
};
