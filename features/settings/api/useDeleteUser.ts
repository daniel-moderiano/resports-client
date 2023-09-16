import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "react-query";
import { ApiSuccessResponseStruct } from "types/backendAPITypes";
import { httpRequest } from "utils/fetchWrapper";
import { generateRequestOptions } from "utils/generateRequestOptions";
import { assertApiResponse } from "utils/assertApiResponse";
import { toast } from "react-hot-toast";

async function deleteUser(accessToken: string): Promise<void> {
  const response = await httpRequest(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/users/`,
    generateRequestOptions("DELETE", accessToken)
  );

  assertApiResponse(response, ApiSuccessResponseStruct);
}

export const useDeleteUser = () => {
  const { getAccessTokenSilently, logout } = useAuth0();

  const mutation = useMutation(
    async () => {
      const accessToken = await getAccessTokenSilently();
      return deleteUser(accessToken);
    },
    {
      onSuccess: () => {
        logout();
        toast.success("Account successfully deleted.");
      },
      onError: () => {
        toast.error("Failed to delete account. Please try again.");
      },
    }
  );

  return mutation;
};
