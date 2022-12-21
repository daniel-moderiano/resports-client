import { useYouTubeIframe } from "features/players/api/useYouTubeIframe";
import * as React from "react";
import { VideoPlayer } from "features/players";
import { YouTubeVideoDetails } from "../video-details/YouTubeVideoDetails";

interface YouTubePlayerProps {
  videoId: string;
}

export const YouTubePlayer = ({ videoId }: YouTubePlayerProps) => {
  const { player } = useYouTubeIframe(videoId);
  return (
    <div>
      <VideoPlayer player={player} controlsDisabled={false} />
      <YouTubeVideoDetails videoId={videoId} defaultPlayer={true} />
    </div>
  );
};
