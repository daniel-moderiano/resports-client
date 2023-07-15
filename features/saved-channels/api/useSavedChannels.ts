import { useQuery } from "react-query";
import {
  Channel,
  GetSavedChannelsResponseDataStruct,
} from "types/backendAPITypes";
import { httpRequest } from "utils/fetchWrapper";
import { generateRequestOptions } from "utils/generateRequestOptions";
import { assertApiResponse } from "utils/validateApiResponse";

async function getSavedChannels(
  userId: string,
  accessToken: string
): Promise<Channel[]> {
  const response = await httpRequest(
    `${process.env.NEXT_PUBLIC_AWS_API_ENDPOINT}/users/${userId}/saved-channels`,
    generateRequestOptions("GET", accessToken)
  );

  assertApiResponse(response, GetSavedChannelsResponseDataStruct);

  return response.data.savedChannels;
}

export const useGetSavedChannels = (userId: string, accessToken: string) => {
  return useQuery("savedChannels", () => getSavedChannels(userId, accessToken));
};
