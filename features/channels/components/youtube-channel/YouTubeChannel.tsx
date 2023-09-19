import { useGetYouTubeChannel } from "features/channels/hooks/useGetYouTubeChannel";
import { YouTubeChannelVideos } from "features/channels";
import { SaveChannelButton } from "features/players";
import { useAuth0 } from "@auth0/auth0-react";

interface YouTubeChannelProps {
  channelId: string;
}

const YouTubeChannel = ({ channelId }: YouTubeChannelProps) => {
  const { isLoading, isError, data } = useGetYouTubeChannel(channelId);
  const { isAuthenticated } = useAuth0();
  return (
    <div>
      {isLoading && <div>YouTube loading...</div>}

      {isError && <div>An error has occurred</div>}

      {data && (
        <div>
          {data.channelData ? (
            <div>
              <section>
                <div>
                  <h2>{data.channelData.snippet.title}</h2>
                  <p>{data.channelData.snippet.description}</p>
                  <img
                    src={data.channelData.snippet.thumbnails.medium.url}
                    alt={`${data.channelData.snippet.title} channel thumbnail`}
                    height={100}
                    width={100}
                  />

                  {/* Note: the bannerUrl has a max res of 512 * 288 and will likely be remove altogether later x  */}
                  <img
                    src={
                      data.channelData.brandingSettings.image.bannerExternalUrl
                    }
                    alt={`${data.channelData.snippet.title} channel banner`}
                    height={100}
                    width={100}
                  />
                </div>
                <div>
                  <p>
                    {data.channelData.statistics.subscriberCount} subscribers
                  </p>
                  <p>{data.channelData.statistics.videoCount} videos</p>
                </div>
                {isAuthenticated && (
                  <SaveChannelButton channelId={channelId} platform="youtube" />
                )}
              </section>
              <div>
                {/*These will immediately be loaded, but will be obscured by an overlay within the component*/}
                <YouTubeChannelVideos
                  uploadsId={
                    data.channelData.contentDetails.relatedPlaylists.uploads
                  }
                />
              </div>
            </div>
          ) : (
            <p>Channel not found</p>
          )}
        </div>
      )}
    </div>
  );
};

export default YouTubeChannel;
