import { TwitchPlayer } from "features/players";
import { TwitchVideoDetails } from "features/players/components/video-details/TwitchVideoDetails";
import { GetServerSideProps } from "next";
import { sanitiseVideoQuery } from "utils/queryHandling";
import * as React from "react";
import { useGetTwitchVideoDetails } from "features/players/hooks/useGetTwitchVideoDetails";
import { PlayerContextProvider } from "providers/PlayerContext";

interface VideoProps {
  videoId: string;
}

// This server side props function ensures the dynamic route param is made available at component render time. Using router.query within the component means videoId would be undefined on initial render.
export const getServerSideProps: GetServerSideProps = async (context) => {
  const videoId = sanitiseVideoQuery(context.query);
  return { props: { videoId } };
};

const Video = ({ videoId }: VideoProps) => {
  // The user should be able to manually disable the overlay to interact with the player in certain circumstances, e.g. mature content, reloading player, etc.
  const [disableControls, setDisableControls] = React.useState(false);
  const { isError, isLoading, data } = useGetTwitchVideoDetails(videoId);

  return (
    <PlayerContextProvider>
      <div>
        <TwitchPlayer
          videoId={videoId}
          disableControls={disableControls}
          videoData={data}
        />
        <TwitchVideoDetails
          videoId={videoId}
          toggleControls={() => setDisableControls(!disableControls)}
          controlsDisabled={disableControls}
        />
      </div>
    </PlayerContextProvider>
  );
};
export default Video;
