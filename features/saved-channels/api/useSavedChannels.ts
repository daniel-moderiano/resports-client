import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import {
  ApiSuccessResponseStruct,
  Channel,
  SavedChannelsApiResponseStruct,
  User,
  UserApiResponseStruct,
} from "types/backendAPITypes";
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

async function addSavedChannel(
  userId: string,
  channel: Channel,
  accessToken: string
): Promise<User> {
  const requestBody = JSON.stringify({
    channel,
  });
  const response = await httpRequest(
    `${process.env.NEXT_PUBLIC_AWS_API_ENDPOINT}/users/${userId}/saved-channels`,
    generateRequestOptions("POST", accessToken, requestBody)
  );

  assertApiResponse(response, UserApiResponseStruct);

  return response.body.data;
}

async function deleteSavedChannel(
  userId: string,
  channelId: string,
  accessToken: string
): Promise<void> {
  const response = await httpRequest(
    `${process.env.NEXT_PUBLIC_AWS_API_ENDPOINT}/users/${userId}/saved-channels/${channelId}`,
    generateRequestOptions("DELETE", accessToken)
  );

  assertApiResponse(response, ApiSuccessResponseStruct);
}

export const useGetSavedChannels = (userId: string) => {
  const { getAccessTokenSilently } = useAuth0();

  return useQuery("savedChannels", async () => {
    const accessToken = await getAccessTokenSilently();
    return getSavedChannels(userId, accessToken);
  });
};

export const useAddSavedChannel = (userId: string) => {
  const { getAccessTokenSilently } = useAuth0();

  const mutation = useMutation(async (channel: Channel) => {
    const accessToken = await getAccessTokenSilently();
    return addSavedChannel(userId, channel, accessToken);
  });

  // mutation object contains methods and values including:
  // mutate - the mutation function
  // data - the data returned from the mutation function
  // isLoading - a boolean that is true when the mutation status is "loading"
  // error - any error returned from the mutation function

  return mutation;
};

export const useDeleteSavedChannel = (userId: string) => {
  const { getAccessTokenSilently } = useAuth0();

  const mutation = useMutation({
    mutationFn: async (channelId: string) => {
      const accessToken = await getAccessTokenSilently();
      return deleteSavedChannel(userId, channelId, accessToken);
    },
  });

  return mutation;
};
