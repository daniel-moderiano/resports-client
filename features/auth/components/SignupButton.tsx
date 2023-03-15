import { useAuth0 } from "@auth0/auth0-react";
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
    <button {...props} onClick={handleSignUp}>
      Sign Up
    </button>
  );
};
