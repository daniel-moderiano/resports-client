import { useGetTwitchChannel } from "features/channels/hooks/useGetTwitchChannel";
import { TwitchChannelVideos } from "features/channels";
import { SaveChannelButton } from "features/players";
import { useAuth0 } from "@auth0/auth0-react";

interface TwitchChannelProps {
  channelId: string;
}

export const TwitchChannelPage = ({ channelId }: TwitchChannelProps) => {
  const { isLoading, isError, data, error } = useGetTwitchChannel(channelId);
  const { isAuthenticated } = useAuth0();

  return (
    <div>
      {isLoading && <div>Twitch loading...</div>}

      {isError && <div>An error has occurred</div>}

      {data && (
        <section>
          <div>
            <h2>{data.channelData.displayName}</h2>
            <p>{data.userData.description}</p>
            <img
              src={data.userData.profilePictureUrl}
              alt={`${data.channelData.displayName} channel thumbnail`}
              height={100}
              width={100}
            />
            {data.userData.offlinePlaceholderUrl && (
              <img
                src={data.userData.offlinePlaceholderUrl}
                alt={`${data.channelData.displayName} channel banner`}
                height={100}
                width={100}
              />
            )}
          </div>
          {isAuthenticated && (
            <SaveChannelButton channelId={channelId} platform="twitch" />
          )}
        </section>
      )}

      {/*These will immediately be loaded, but will be obscured by an overlay within the component*/}
      <TwitchChannelVideos userId={channelId} />
    </div>
  );
};
