import * as React from "react";
import { useTwitchPlayer } from "features/players/api/useTwitchPlayer";
import { VideoPlayer } from "features/players";
import { TwitchVideoDetails } from "../video-details/TwitchVideoDetails";
import { useGetTwitchVideoDetails } from "features/players/hooks/useGetTwitchVideoDetails";

interface TwitchPlayerProps {
  videoId: string;
}

export const TwitchPlayer = ({ videoId }: TwitchPlayerProps) => {
  const { player } = useTwitchPlayer(videoId);
  const [controlsDisabled, setControlsDisabled] = React.useState(false);
  const { isError, isLoading, data } = useGetTwitchVideoDetails(videoId);

  return (
    <div>
      <VideoPlayer
        player={player}
        videoDetails={data}
        controlsDisabled={controlsDisabled}
      />
      {data && (
        <TwitchVideoDetails
          videoDetails={data}
          controlsDisabled={controlsDisabled}
          toggleControls={() => setControlsDisabled(!controlsDisabled)}
        />
      )}
    </div>
  );
};
