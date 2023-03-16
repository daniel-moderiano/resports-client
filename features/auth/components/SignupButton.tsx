import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "components/button/Button";
import React from "react";

export const SignupButton = (
  props: React.ButtonHTMLAttributes<HTMLButtonElement>
) => {
  const { loginWithRedirect } = useAuth0();

  const handleSignUp = async () => {
    await loginWithRedirect({
      authorizationParams: {
        screen_hint: "signup",
      },
    });
  };

  return (
    <Button variant="secondary" {...props} onClick={handleSignUp}>
      Sign Up
    </Button>
  );
};
