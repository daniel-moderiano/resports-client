import { useAuth0 } from "@auth0/auth0-react";

/**
 * Wrapper around `useAuth0` hook to extract the currnelty logged in
 * user's ID, if available.
 *
 * @returns `userId` or `null` depending on whether the user ID can be obtained
 */
export const useUserId = () => {
  const { user } = useAuth0();

  return user && user.sub ? user.sub : null;
};
