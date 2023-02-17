import { useAuth0 } from "@auth0/auth0-react";
import * as React from "react";

const Profile = () => {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } =
    useAuth0();
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

    console.log(user);
  }, [getAccessTokenSilently, user]);

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return isAuthenticated && user ? (
    <div>
      <img src={user.picture} alt={user.name} />
      <h2>{user.name}</h2>
      <p>{user.email}</p>
      <h3>User Metadata</h3>
      {userMetadata ? <p>{userMetadata}</p> : "No user metadata defined"}
    </div>
  ) : (
    <h2>You are not logged in</h2>
  );
};

export default Profile;
