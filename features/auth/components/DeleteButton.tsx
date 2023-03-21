import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "components/button";
import { useDeleteUser } from "features/settings/api/useDeleteUser";
import * as React from "react";

interface DeleteButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  userId: string;
}

export const DeleteButton = ({ userId }: DeleteButtonProps) => {
  const { isLoading, error, mutate, data, isSuccess } = useDeleteUser(userId);
  const { logout } = useAuth0();

  React.useEffect(() => {
    if (isLoading) {
      console.log("Loading....");
    }

    if (isSuccess) {
      console.log("All data deleted");
      logout();
    }
  });

  return (
    <Button
      variant="danger"
      onClick={() => {
        mutate();
      }}
    >
      Delete Account
    </Button>
  );
};
