import { mocked } from "jest-mock";
import { useAuth0 } from "@auth0/auth0-react";
import { AuthState } from "@auth0/auth0-react/dist/auth-state";

jest.mock("@auth0/auth0-react");

export const mockedUseAuth0 = mocked(useAuth0);

// Allow the user of this mock to alter the return value with a custom authState, or use the default logged in user state
const mockUseAuth0 = (authState?: AuthState) => {
  let mockedAuthState: AuthState = {
    isAuthenticated: true,
    user: {},
    isLoading: false,
    error: undefined,
  };

  if (authState) {
    mockedAuthState = authState;
  }
  return mockedUseAuth0.mockReturnValue({
    ...mockedAuthState,
    logout: jest.fn(),
    loginWithRedirect: jest.fn(),
    getAccessTokenWithPopup: jest.fn(),
    getAccessTokenSilently: jest.fn(),
    getIdTokenClaims: jest.fn(),
    loginWithPopup: jest.fn(),
    handleRedirectCallback: jest.fn(),
  });
};
