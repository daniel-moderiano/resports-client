import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "components/button";
import { ButtonHTMLAttributes } from "react";

export const LogoutButton = (
  props: ButtonHTMLAttributes<HTMLButtonElement>
) => {
  const { logout } = useAuth0();

  return (
    <Button
      {...props}
      variant="none"
      onClick={() =>
        logout({
          logoutParams: { returnTo: process.env.NEXT_PUBLIC_AUTH0_LOGOUT_URI },
        })
      }
    >
      Log Out
    </Button>
  );
};
