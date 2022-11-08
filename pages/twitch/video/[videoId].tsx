import { TwitchPlayer } from "features/players";
import { GetServerSideProps } from "next";
import { sanitiseVideoQuery } from "utils/queryHandling";

interface VideoProps {
  videoId: string;
}

// This server side props function ensures the dynamic route param is made available at component render time. Using router.query within the component means videoId would be undefined on initial render.
export const getServerSideProps: GetServerSideProps = async (context) => {
  const videoId = sanitiseVideoQuery(context.query);
  return { props: { videoId } };
};

const Video = ({ videoId }: VideoProps) => <TwitchPlayer videoId={videoId} />;
export default Video;
