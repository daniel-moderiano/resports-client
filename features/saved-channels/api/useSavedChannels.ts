import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery, useQueryClient } from "react-query";
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

async function getSavedChannels(accessToken: string): Promise<Channel[]> {
  const response = await httpRequest(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/users/saved-channels`,
    generateRequestOptions("GET", accessToken)
  );

  assertApiResponse(response, SavedChannelsApiResponseStruct);

  return response.body.data;
}

async function addSavedChannel(
  channel: Channel,
  accessToken: string
): Promise<User> {
  const requestBody = JSON.stringify({
    channel,
  });
  const response = await httpRequest(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/users/saved-channels`,
    generateRequestOptions("POST", accessToken, requestBody)
  );

  assertApiResponse(response, UserApiResponseStruct);

  return response.body.data;
}

async function deleteSavedChannel(
  channelId: string,
  accessToken: string
): Promise<void> {
  const response = await httpRequest(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/users/saved-channels/${channelId}`,
    generateRequestOptions("DELETE", accessToken)
  );

  assertApiResponse(response, ApiSuccessResponseStruct);
}

export const useGetSavedChannels = () => {
  const { getAccessTokenSilently } = useAuth0();

  return useQuery("savedChannels", async () => {
    const accessToken = await getAccessTokenSilently();
    return getSavedChannels(accessToken);
  });
};

export const useAddSavedChannel = () => {
  const { getAccessTokenSilently } = useAuth0();
  const queryClient = useQueryClient();

  const mutation = useMutation(
    async (channel: Channel) => {
      const accessToken = await getAccessTokenSilently();
      return addSavedChannel(channel, accessToken);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("savedChannels");
      },
    }
  );

  return mutation;
};

export const useDeleteSavedChannel = () => {
  const { getAccessTokenSilently } = useAuth0();
  const queryClient = useQueryClient();

  const mutation = useMutation(
    async (channelId: string) => {
      const accessToken = await getAccessTokenSilently();
      return deleteSavedChannel(channelId, accessToken);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("savedChannels");
      },
    }
  );

  return mutation;
};
