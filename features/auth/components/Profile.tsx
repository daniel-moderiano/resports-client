import { useAuth0 } from "@auth0/auth0-react";
import * as React from "react";
import { DeleteButton } from "./DeleteButton";

export const Profile = () => {
  const { user, getAccessTokenSilently } = useAuth0();
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

    console.log(JSON.stringify(user));
    console.log(accessToken);
  }, [getAccessTokenSilently, user, accessToken]);

  return (
    <div>
      {user && accessToken && (
        <>
          {user.sub && (
            <DeleteButton userId={user.sub} accessToken={accessToken} />
          )}
        </>
      )}
    </div>
  );
};
