import { useAuth0 } from "@auth0/auth0-react";
import * as React from "react";

export const Profile = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [accessToken, setAccessToken] = React.useState<null | string>(null);

  React.useEffect(() => {
    const getUserMetadata = async () => {
      try {
        const accessToken = await getAccessTokenSilently();
        setAccessToken(accessToken);
      } catch (error) {
        console.log(error);
      }
    };

    getUserMetadata();

    console.log(accessToken);
  }, [getAccessTokenSilently, accessToken]);

  return <div></div>;
};
