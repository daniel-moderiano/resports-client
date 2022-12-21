import { TwitchPlayer } from "features/players";
import { TwitchVideoDetails } from "features/players/components/video-details/TwitchVideoDetails";
import { GetServerSideProps } from "next";
import { sanitiseVideoQuery } from "utils/queryHandling";
import * as React from "react";
import { useGetTwitchVideoDetails } from "features/players/hooks/useGetTwitchVideoDetails";
import { ControlsContextProvider } from "providers/ControlsContext";

interface VideoProps {
  videoId: string;
}

// This server side props function ensures the dynamic route param is made available at component render time. Using router.query within the component means videoId would be undefined on initial render.
export const getServerSideProps: GetServerSideProps = async (context) => {
  const videoId = sanitiseVideoQuery(context.query);
  return { props: { videoId } };
};

const Video = ({ videoId }: VideoProps) => {
  const { isError, isLoading, data } = useGetTwitchVideoDetails(videoId);

  return (
    <ControlsContextProvider>
      <div>
        <TwitchPlayer videoId={videoId} videoData={data} />
        <TwitchVideoDetails videoId={videoId} />
      </div>
    </ControlsContextProvider>
  );
};
export default Video;
