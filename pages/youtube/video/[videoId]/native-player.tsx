import { GetServerSideProps } from "next";
import { sanitiseVideoQuery } from "utils/queryHandling";
import { YouTubeNativePlayer } from "features/players";
import Link from "next/link";
import { YouTubeVideoDetails } from "features/players/components/video-details/YouTubeVideoDetails";
import { useState } from "react";

interface VideoProps {
  videoId: string;
}

// This server side props function ensures the dynamic route param is made available at component render time. Using router.query within the component means videoId would be undefined on initial render.
export const getServerSideProps: GetServerSideProps = async (context) => {
  const videoId = sanitiseVideoQuery(context.query);
  return { props: { videoId } };
};

const Video = ({ videoId }: VideoProps) => {
  // The user should be able to manually disable the custom controls to access the native YouTube controls (mainly to allow quality adjustment)
  const [disableControls, setDisableControls] = useState(true);
  return (
    <div>
      <YouTubeNativePlayer
        videoId={videoId}
        controlsDisabled={disableControls}
      />
      <YouTubeVideoDetails
        videoId={videoId}
        defaultPlayer={false}
        toggleControls={() => setDisableControls(!disableControls)}
        controlsDisabled={disableControls}
      />
    </div>
  );
};

export default Video;
