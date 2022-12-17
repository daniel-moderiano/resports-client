import { GetServerSideProps } from "next";
import { sanitiseVideoQuery } from "utils/queryHandling";
import { YouTubeNativePlayer } from "features/players";
import Link from "next/link";
import { YouTubeVideoDetails } from "features/players/components/video-details/YouTubeVideoDetails";

interface VideoProps {
  videoId: string;
}

// This server side props function ensures the dynamic route param is made available at component render time. Using router.query within the component means videoId would be undefined on initial render.
export const getServerSideProps: GetServerSideProps = async (context) => {
  const videoId = sanitiseVideoQuery(context.query);
  return { props: { videoId } };
};

const Video = ({ videoId }: VideoProps) => {
  return (
    <div>
      <YouTubeNativePlayer videoId={videoId} />
      <YouTubeVideoDetails videoId={videoId} defaultPlayer={false} />
    </div>
  );
};

export default Video;
