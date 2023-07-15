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
  const requestOptions = generateRequestOptions("GET", accessToken);
  const response = await httpRequest(
    `${process.env.NEXT_PUBLIC_AWS_API_ENDPOINT}/users/${userId}/saved-channels`,
    requestOptions
  );

  assertApiResponse(response, GetSavedChannelsResponseDataStruct);

  return response.data.savedChannels;
}
