import { useMutation } from "react-query";

const handleFetchErrors = (response: Response) => {
  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response;
};

// Deleting a user is a two-step API call process, one for the Postgres user, the other for the Auth0 database user

export function useDeleteUser(
  userId: string | undefined,
  accessToken: string | null
) {
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };
  const deletePostgresUser = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_AWS_API_ENDPOINT}/users/${userId}`,
      options
    );

    return handleFetchErrors(response);
  };

  const deleteAuth0User = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_AWS_API_ENDPOINT}/users/auth0/${userId}`,
      options
    );

    return handleFetchErrors(response);
  };

  return useMutation({
    mutationKey: ["users", userId],
    mutationFn: async () => {
      return Promise.all([deleteAuth0User(), deletePostgresUser()]);
    },
  });
}
