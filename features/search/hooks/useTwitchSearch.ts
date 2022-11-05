import { useQuery } from "react-query";
import apiClient from "config/twitchApiClient";

// conditions specify any additional criteria that must evaluate to true before the query is executed
export const useTwitchSearch = (searchQuery: string, conditions?: boolean) => {
  const { isLoading, isError, data, error } = useQuery(
    ["twitchSearchResults", searchQuery],
    async () => {
      // The apiClient from the twurple library has internal error handling; no manual error handling is required here.
      console.log("Calling Twitch API fetch");
      const response = await apiClient.search.searchChannels(searchQuery);

      // * This ignores pagination at this stage
      return response.data;
    },
    {
      // Check for additional conditions before formulating enabled expression. gapiClientReady must always be present, as must enableApi
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
