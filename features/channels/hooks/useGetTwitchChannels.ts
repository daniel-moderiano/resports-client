import { useQuery } from "react-query";
import apiClient from "config/twitchApiClient";
import { TwitchChannel } from "features/channels/types";

// conditions specify any additional criteria that must evaluate to true before the query is executed
export const useGetTwitchChannels = (
  channelIds: string[],
  conditions?: boolean
) => {
  const { isLoading, isError, data, error } = useQuery(
    ["twitchChannels", channelIds],
    async () => {
      // The apiClient from the twurple library has internal error handling; no manual error handling is required here.
      const channelResponses = await apiClient.channels.getChannelInfoByIds(
        channelIds
      );
      const userResponses = await apiClient.users.getUsersByIds(channelIds);

      // By initially setting this to null, we can ensure that if data is returned by this API call (i.e. data property in a React Query call for example), it WILL contain all the elements below, thereby removing need for checking, say,whether data.userData exists.
      const channels: TwitchChannel[] = [];
      for (const channel of channelResponses) {
        const associatedUserData = userResponses.find(
          (user) => user.id === channel.id
        );
        const associatedUserIsLive = associatedUserData
          ? (await associatedUserData.getStream()) !== null
          : false;
        if (associatedUserData) {
          channels.push({
            channelData: channel,
            userData: associatedUserData,
            isLive: associatedUserIsLive,
          });
        } else {
          console.error(
            `Unable to find associated user for channel: ${channel.id} - ${channel.displayName}`
          );
        }
      }

      return channels;
    },
    {
      // Check for additional conditions before formulating enabled expression.
      enabled: conditions !== undefined ? conditions : true,
    }
  );

  return {
    isLoading,
    isError,
    data,
    error,
  };
};
