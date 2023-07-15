import { useAuth0 } from "@auth0/auth0-react";
import * as React from "react";

interface AccessTokenContextValues {
  accessToken: string | null;
}

interface AccessTokenContextProviderProps {
  children: React.ReactNode;
}

// Initialise as undefined to ensure that non-provider wrapped components can't access the context
export const AccessTokenContext = React.createContext<AccessTokenContextValues>(
  {
    accessToken: null,
  }
);

export const AccessTokenContextProvider = ({
  children,
}: AccessTokenContextProviderProps) => {
  const { getAccessTokenSilently } = useAuth0();
  const [accessToken, setAccessToken] = React.useState<null | string>(null);

  React.useEffect(() => {
    const getAccessToken = async () => {
      try {
        const token = await getAccessTokenSilently();
        setAccessToken(token);
      } catch (error) {
        console.log(error);
      }
    };

    getAccessToken();
  }, [getAccessTokenSilently]);

  return (
    <AccessTokenContext.Provider value={{ accessToken }}>
      {children}
    </AccessTokenContext.Provider>
  );
};

export const useAccessToken = () => {
  const { accessToken } = React.useContext(AccessTokenContext);
  return accessToken;
};
