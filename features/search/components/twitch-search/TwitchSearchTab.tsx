import { Routes } from "config/routes";
import { useTwitchSearch } from "features/search/hooks/useTwitchSearch";
import { ChannelCard } from "../ChannelCard";

interface TwitchSearchTabProps {
  searchQuery: string;
}

export const TwitchSearchTab = ({ searchQuery }: TwitchSearchTabProps) => {
  const { isLoading, isError, data } = useTwitchSearch(searchQuery);

  return (
    <div>
      {isLoading && <div>Twitch loading...</div>}

      {isError && <div>An error has occurred</div>}

      {data && (
        <>
          {data.length > 0 ? (
            <>
              {data.map((channel) => (
                <ChannelCard
                  key={channel.id}
                  thumbnailUrl={channel.thumbnailUrl}
                  title={channel.displayName}
                  gameName={channel.gameName}
                  route={`${Routes.twitch.channel}/${channel.id}`}
                  live={channel.isLive}
                />
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
