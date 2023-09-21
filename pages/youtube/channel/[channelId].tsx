import { YouTubeChannelPage } from "features/channels";
import { useAddChannelToRecent } from "features/recently-viewed-channels";
import { GetServerSideProps } from "next";
import { sanitiseChannelQuery } from "utils/queryHandling";

interface ChannelProps {
  channelId: string;
}

// This server side props function ensures the dynamic route param is made available at component render time. Using router.query within the component means channelId would be undefined on initial render.
export const getServerSideProps: GetServerSideProps = async (context) => {
  const channelId = sanitiseChannelQuery(context.query);
  return { props: { channelId } };
};

const Channel = ({ channelId }: ChannelProps) => {
  useAddChannelToRecent({
    channel_id: channelId,
    platform: "youtube",
  });
  return <YouTubeChannelPage channelId={channelId} />;
};

export default Channel;
