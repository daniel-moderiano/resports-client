import { mocked } from "jest-mock";
import { useAuth0 } from "@auth0/auth0-react";
import { AuthState } from "@auth0/auth0-react/dist/auth-state";

// This must remain top-level
jest.mock("@auth0/auth0-react");

const mockedUseAuth0 = mocked(useAuth0);

// User should call this top level within test files
export const mockUseAuth0 = () => {
  mockedUseAuth0.mockReturnValue({
    isAuthenticated: true,
    user: {},
    isLoading: false,
    error: undefined,
    logout: jest.fn(),
    loginWithRedirect: jest.fn(),
    getAccessTokenWithPopup: jest.fn(),
    getAccessTokenSilently: jest.fn(),
    getIdTokenClaims: jest.fn(),
    loginWithPopup: jest.fn(),
    handleRedirectCallback: jest.fn(),
  });
};

// Call this within individual tests to change auth state/conditions test-by-test
export const mockUseAuth0ReturnValue = (authState: AuthState) => {
  mockedUseAuth0.mockReturnValue({
    ...authState,
    logout: jest.fn(),
    loginWithRedirect: jest.fn(),
    getAccessTokenWithPopup: jest.fn(),
    getAccessTokenSilently: jest.fn(),
    getIdTokenClaims: jest.fn(),
    loginWithPopup: jest.fn(),
    handleRedirectCallback: jest.fn(),
  });
};
