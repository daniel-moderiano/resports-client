import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "components/button/Button";
import { ButtonHTMLAttributes } from "react";
import { toast } from "react-hot-toast";

export const SignupButton = (
  props: ButtonHTMLAttributes<HTMLButtonElement>
) => {
  const { loginWithRedirect } = useAuth0();

  const handleSignUp = async () => {
    try {
      await loginWithRedirect({
        authorizationParams: {
          screen_hint: "signup",
        },
      });
    } catch (error) {
      toast.error("Error: Unable to sign up. Please try again.");
      console.error(error);
    }
  };

  return (
    <Button variant="secondary" {...props} onClick={handleSignUp}>
      Sign Up
    </Button>
  );
};
