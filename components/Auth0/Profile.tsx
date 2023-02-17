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
  }, [getAccessTokenSilently]);

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const token = await getAccessTokenSilently({
  //         authorizationParams: {
  //           audience: 'https://api.example.com/', // Value in Identifier field for the API being called.
  //           scope: 'read:posts', // Scope that exists for the API being called. You can create these through the Auth0 Management API or through the Auth0 Dashboard in the Permissions view of your API.
  //         }
  //       });
  //       const response = await fetch('https://api.example.com/posts', {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });
  //       setPosts(await response.json());
  //     } catch (e) {
  //       console.error(e);
  //     }
  //   })();
  // }, [getAccessTokenSilently]);

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
