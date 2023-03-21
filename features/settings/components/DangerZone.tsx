import { User } from "@auth0/auth0-react";
import { DeleteButton } from "features/auth";

interface DangerZoneProps {
  user: User;
}

export const DangerZone = ({ user }: DangerZoneProps) => {
  return (
    <section>
      <h3>Danger Zone</h3>
      {user.sub && <DeleteButton userId={user.sub} />}
    </section>
  );
};
