import { YouTubeChannelPage } from "features/channels";
import { GetServerSideProps } from "next";
import { sanitiseChannelQuery } from "utils/queryHandling";

interface ChannelProps {
  channelId: string;
}

// This server side props function ensures the dynamic route param is made available at component render time so that it can be passed safely and directly to the useGetTwitchChannel hook. Using router.query in component causes it to be undefined on initial render.
export const getServerSideProps: GetServerSideProps = async (context) => {
  const channelId = sanitiseChannelQuery(context.query);
  return { props: { channelId } };
};

const Channel = ({ channelId }: ChannelProps) => {
  return <YouTubeChannelPage channelId={channelId} />;
};

export default Channel;
