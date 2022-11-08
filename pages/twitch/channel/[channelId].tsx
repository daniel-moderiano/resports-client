import { sanitiseChannelQuery } from "utils/queryHandling";
import { GetServerSideProps } from "next";
import { TwitchChannelPage } from "features/channels";

interface ChannelProps {
  channelId: string;
}

// This server side props function ensures the dynamic route param is made available at component render time. Using router.query within the component means channelId would be undefined on initial render.
export const getServerSideProps: GetServerSideProps = async (context) => {
  const channelId = sanitiseChannelQuery(context.query);
  return { props: { channelId } };
};

const Channel = ({ channelId }: ChannelProps) => (
  <TwitchChannelPage channelId={channelId} />
);

export default Channel;
