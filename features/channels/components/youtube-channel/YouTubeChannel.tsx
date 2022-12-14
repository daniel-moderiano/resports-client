import { useGetYouTubeChannel } from "features/channels/hooks/useGetYouTubeChannel";
import Image from "next/image";
import { YouTubeChannelVideos } from "features/channels";
import { useEffect } from "react";

interface YouTubeChannelProps {
  channelId: string;
}

const YouTubeChannel = ({ channelId }: YouTubeChannelProps) => {
  const { isLoading, isError, data } = useGetYouTubeChannel(channelId);

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
                  <Image
                    src={data.channelData.snippet.thumbnails.medium.url}
                    alt={`${data.channelData.snippet.title} channel thumbnail`}
                    height={100}
                    width={100}
                  />

                  {/* Note: the bannerUrl has a max res of 512 * 288 and will likely be remove altogether later x  */}
                  <Image
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
