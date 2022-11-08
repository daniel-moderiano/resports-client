import { useGetTwitchChannel } from "features/channels/hooks/useGetTwitchChannel";
import Image from "next/image";
import { sanitiseChannelQuery } from "utils/queryHandling";
import { GetServerSideProps } from "next";
import { TwitchChannelVideos } from "features/channels";

interface TwitchChannelProps {
  channelId: string;
}

// This server side props function ensures the dynamic route param is made available at component render time so that it can be passed safely and directly to the useGetTwitchChannel hook. Using router.query in component causes it to be undefined on initial render.
/* eslint-disable-next-line */
export const getServerSideProps: GetServerSideProps = async (context) => {
  const channelId = sanitiseChannelQuery(context.query);

  // Pass data to the page via props
  return { props: { channelId } };
};

const TwitchChannel = ({ channelId }: TwitchChannelProps) => {
  const { isLoading, isError, data, error } = useGetTwitchChannel(channelId);
  console.log(channelId);

  return (
    <div>
      {isLoading && <div>Twitch loading...</div>}

      {isError && <div>An error has occurred</div>}

      {data && (
        <section>
          <div>
            <h2>{data.channelData.displayName}</h2>
            <p>{data.userData.description}</p>
            <Image
              src={data.userData.profilePictureUrl}
              alt={`${data.channelData.displayName} channel thumbnail`}
              height={100}
              width={100}
            />
            {data.userData.offlinePlaceholderUrl && (
              <Image
                src={data.userData.offlinePlaceholderUrl}
                alt={`${data.channelData.displayName} channel banner`}
                height={100}
                width={100}
              />
            )}
          </div>
        </section>
      )}

      {/*These will immediately be loaded, but will be obscured by an overlay within the component*/}
      <TwitchChannelVideos userId={channelId} />
    </div>
  );
};

export default TwitchChannel;
