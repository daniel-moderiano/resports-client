import * as React from "react";
import { useTwitchPlayer } from "features/players/api/useTwitchPlayer";
import { VideoPlayer } from "features/players";
import { TwitchVideo } from "features/channels";

interface TwitchPlayerProps {
  videoId: string;
  videoData: TwitchVideo | undefined | null;
}

export const TwitchPlayer = ({ videoId, videoData }: TwitchPlayerProps) => {
  const { player } = useTwitchPlayer(videoId);

  return <VideoPlayer player={player} videoData={videoData} />;
};
