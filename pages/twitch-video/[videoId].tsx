// The video/watch page that houses an embedded Twitch iframe/player
import { TwitchPlayer } from "features/players";
import { GetServerSideProps } from "next";
import { sanitiseVideoQuery } from "utils/queryHandling";

interface TwitchVideoProps {
  videoId: string;
}

// This server side props function ensures the dynamic route param is made available at component render time so that it can be passed safely and directly to the TwitchVideo component hook. Using router.query in component causes videoId to be undefined on initial render.
/* eslint-disable-next-line */
export const getServerSideProps: GetServerSideProps = async (context) => {
  const videoId = sanitiseVideoQuery(context.query);

  // Pass data to the page via props
  return { props: { videoId } };
};

const TwitchVideo = ({ videoId }: TwitchVideoProps) => {
  return (
    <div>
      <TwitchPlayer videoId={videoId} />
    </div>
  );
};

export default TwitchVideo;
