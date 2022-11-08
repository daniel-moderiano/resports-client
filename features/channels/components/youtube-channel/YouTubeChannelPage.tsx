import YouTubeChannel from "features/channels/components/youtube-channel/YouTubeChannel";
import { GapiContextProvider } from "providers/GapiContext";

interface YouTubeChannelPageProps {
  channelId: string;
}

export const YouTubeChannelPage = ({ channelId }: YouTubeChannelPageProps) => {
  return (
    <GapiContextProvider>
      <YouTubeChannel channelId={channelId} />
    </GapiContextProvider>
  );
};
