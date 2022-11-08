import YouTubeChannel from "features/channels/components/youtube-channel/YouTubeChannel";
import { GetServerSideProps } from "next";
import { GapiContextProvider } from "providers/GapiContext";
import { sanitiseChannelQuery } from "utils/queryHandling";

interface YouTubeChannelPageProps {
  channelId: string;
}

// This server side props function ensures the dynamic route param is made available at component render time so that it can be passed safely and directly to the useGetTwitchChannel hook. Using router.query in component causes it to be undefined on initial render.
/* eslint-disable-next-line */
export const getServerSideProps: GetServerSideProps = async (context) => {
  const channelId = sanitiseChannelQuery(context.query);

  // Pass data to the page via props
  return { props: { channelId } };
};

const Channel = ({ channelId }: YouTubeChannelPageProps) => {
  return (
    <GapiContextProvider>
      <YouTubeChannel channelId={channelId} />
    </GapiContextProvider>
  );
};

export default Channel;
