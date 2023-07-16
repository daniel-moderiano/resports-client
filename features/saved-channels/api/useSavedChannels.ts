import { useAuth0 } from "@auth0/auth0-react";
import { useQuery } from "react-query";
import { Channel, SavedChannelsApiResponseStruct } from "types/backendAPITypes";
import { httpRequest } from "utils/fetchWrapper";
import { generateRequestOptions } from "utils/generateRequestOptions";
import { assertApiResponse } from "utils/assertApiResponse";

async function getSavedChannels(
  userId: string,
  accessToken: string
): Promise<Channel[]> {
  const response = await httpRequest(
    `${process.env.NEXT_PUBLIC_AWS_API_ENDPOINT}/users/${userId}/saved-channels`,
    generateRequestOptions("GET", accessToken)
  );

  assertApiResponse(response, SavedChannelsApiResponseStruct);

  return response.body.data;
}

export const useGetSavedChannels = (userId: string) => {
  const { getAccessTokenSilently } = useAuth0();

  return useQuery("savedChannels", async () => {
    const accessToken = await getAccessTokenSilently();
    return getSavedChannels(userId, accessToken);
  });
};
