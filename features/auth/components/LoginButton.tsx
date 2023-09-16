import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "components/button";
import { HTMLAttributes } from "react";
import { toast } from "react-hot-toast";

export const LoginButton = (props: HTMLAttributes<HTMLButtonElement>) => {
  const { loginWithRedirect } = useAuth0();

  const handleLogin = async () => {
    try {
      await loginWithRedirect();
    } catch (error) {
      toast.error("Error: Unable to log in. Please try again.");
      console.error(error);
    }
  };

  return (
    <Button {...props} onClick={handleLogin}>
      Log In
    </Button>
  );
};
