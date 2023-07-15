/**
 * Helper to generate basic headers for making API gateway requests.
 *
 * @param getAccessToken JWT access token used in auth header
 * @returns RequestInit options for use in HTTP fetch requests
 */
export const generateRequestOptions = (
  method: string,
  accessToken: string
): Partial<RequestInit> => {
  return {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };
};
