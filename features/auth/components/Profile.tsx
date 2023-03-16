import { useAuth0 } from "@auth0/auth0-react";
import * as React from "react";

export const Profile = () => {
  const { user, getAccessTokenSilently } = useAuth0();
  const [userMetadata, setUserMetadata] = React.useState<null | string>(null);

  React.useEffect(() => {
    const getUserMetadata = async () => {
      try {
        const accessToken = await getAccessTokenSilently();
        setUserMetadata(accessToken);
      } catch (error) {
        console.log(error);
      }
    };

    getUserMetadata();

    console.log(JSON.stringify(user));
    console.log(userMetadata);
  }, [getAccessTokenSilently, user, userMetadata]);

  return <div></div>;
};
