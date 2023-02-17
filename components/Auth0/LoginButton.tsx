import { useAuth0 } from "@auth0/auth0-react";
import * as React from "react";

const LoginButton = (props: React.HTMLAttributes<HTMLButtonElement>) => {
  const { loginWithRedirect } = useAuth0();

  return (
    <button {...props} onClick={() => loginWithRedirect()}>
      Log In
    </button>
  );
};

export default LoginButton;