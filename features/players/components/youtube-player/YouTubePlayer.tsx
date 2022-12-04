import { useYouTubeIframe } from "features/players/api/useYouTubeIframe";
import * as React from "react";
import { VideoPlayer } from "features/players";

interface YouTubePlayerProps {
  videoId: string;
}

export const YouTubePlayer = ({ videoId }: YouTubePlayerProps) => {
  const { player } = useYouTubeIframe(videoId);

  return <VideoPlayer player={player} />;
};
