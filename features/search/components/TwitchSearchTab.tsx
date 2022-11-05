import { useTwitchSearch } from "../hooks/useTwitchSearch";
import TwitchChannelResult from "./TwitchChannelResult";

interface TwitchSearchTabProps {
  searchQuery: string;
}

const TwitchSearchTab = ({ searchQuery }: TwitchSearchTabProps) => {
  const { isLoading, isError, data, error } = useTwitchSearch(searchQuery);

  return (
    <div>
      {isLoading && <div>Twitch loading...</div>}

      {isError && <div>An error has occurred</div>}

      {data && (
        <>
          {data.length > 0 ? (
            <>
              {data.map((channel) => (
                <TwitchChannelResult key={channel.id} channelData={channel} />
              ))}
            </>
          ) : (
            <div>No results found</div>
          )}
        </>
      )}
    </div>
  );
};

export default TwitchSearchTab;
