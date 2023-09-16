import { Button } from "components/button";
import { LoadingSpinner } from "components/spinner";
import { useDeleteUser } from "features/settings/api/useDeleteUser";

export const DeleteButton = () => {
  const { mutate: deleteUser, isLoading } = useDeleteUser();

  return (
    <Button variant="danger" onClick={() => deleteUser()} disabled={isLoading}>
      {isLoading && <LoadingSpinner />}
      Delete Account
    </Button>
  );
};
