import { useAccessToken } from "providers/AccessTokenContext";

export const Profile = () => {
  const accessToken = useAccessToken();
  return <div>{accessToken}</div>;
};
