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
  // The user should be able to manually disable the overlay to interact with the player in certain circumstances, e.g. mature content, reloading player, etc.
  const [disableControls, setDisableControls] = useState(false);
  return (
    <div>
      <YouTubeNativePlayer
        videoId={videoId}
        disableControls={disableControls}
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
