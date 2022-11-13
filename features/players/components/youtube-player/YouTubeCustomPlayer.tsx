import { useYouTubeIframe } from "features/players/api/useYouTubeIframe";
import * as React from "react";
import { VideoPlayer } from "../VideoPlayer";

interface YouTubeCustomPlayerProps {
  videoId: string;
}

export const YouTubeCustomPlayer = ({ videoId }: YouTubeCustomPlayerProps) => {
  const { player } = useYouTubeIframe(videoId);

  return <VideoPlayer player={player} />;
};
