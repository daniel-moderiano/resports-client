import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "react-query";
import { ApiSuccessResponseStruct } from "types/backendAPITypes";
import { httpRequest } from "utils/fetchWrapper";
import { generateRequestOptions } from "utils/generateRequestOptions";
import { assertApiResponse } from "utils/assertApiResponse";

async function deleteUser(userId: string, accessToken: string): Promise<void> {
  const response = await httpRequest(
    `${process.env.NEXT_PUBLIC_AWS_API_ENDPOINT}/users/${userId}`,
    generateRequestOptions("DELETE", accessToken)
  );

  assertApiResponse(response, ApiSuccessResponseStruct);
}

export const useDeleteUser = (userId: string) => {
  const { getAccessTokenSilently, logout } = useAuth0();

  const mutation = useMutation(
    async () => {
      const accessToken = await getAccessTokenSilently();
      return deleteUser(userId, accessToken);
    },
    {
      onSuccess: () => {
        logout();
      },
    }
  );

  return mutation;
};
