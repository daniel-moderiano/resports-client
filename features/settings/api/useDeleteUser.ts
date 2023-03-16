import { useMutation } from "react-query";

export function useDeleteUser(userId: string, accessToken: string) {
  return useMutation({
    mutationKey: ["users", userId],
    mutationFn: () => {
      return fetch(
        `${process.env.NEXT_PUBLIC_AWS_API_ENDPOINT}/users/${userId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
    },
  });
}
