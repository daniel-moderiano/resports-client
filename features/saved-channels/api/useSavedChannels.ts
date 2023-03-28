import { useAuth0 } from "@auth0/auth0-react";
import { useQuery } from "react-query";
import { SavedChannel } from "types/backendAPITypes";
import { httpRequest } from "utils/fetchWrapper";

export function useProjects(userId: string | undefined) {
  const { getAccessTokenSilently } = useAuth0();

  const generateOptions = async () => {
    const accessToken = await getAccessTokenSilently();

    return {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    };
  };

  async function getSavedChannels() {
    const options = await generateOptions();

    const response = await httpRequest<SavedChannel[]>(
      `${process.env.NEXT_PUBLIC_AWS_API_ENDPOINT}/users/${userId}`,
      options
    );

    return response;
  }
  return useQuery<SavedChannel[], Error>("savedChannels", getSavedChannels);
}
