import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "components/button";
import { LoadingSpinner } from "components/spinner";
import { HTMLAttributes, useState } from "react";
import { toast } from "react-hot-toast";

export const LoginButton = (props: HTMLAttributes<HTMLButtonElement>) => {
  const [isPingLoading, setIsPingLoading] = useState(false);
  const { loginWithRedirect } = useAuth0();

  const preLoginPing = async () => {
    setIsPingLoading(true);
    try {
      // Send a GET request to the root URL of the API server to wake it up.
      const response = await fetch(process.env.NEXT_PUBLIC_SERVER_ROOT_URL);
      console.log("Server wake-up successful");

      if (!response.ok) {
        throw new Error("Server wake-up failed");
      }
    } catch (error) {
      console.error("Error waking up server:", error);
      toast.error("Server wake-up failed");
    } finally {
      setIsPingLoading(false);
    }
  };

  const handleLogin = async () => {
    try {
      await preLoginPing();
      await loginWithRedirect();
    } catch (error) {
      toast.error("Error: Unable to log in. Please try again.");
      console.error(error);
    }
  };

  return (
    <Button {...props} onClick={handleLogin} disabled={isPingLoading}>
      {isPingLoading && <LoadingSpinner />}
      Log In
    </Button>
  );
};
