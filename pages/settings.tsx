import { useAuth0 } from "@auth0/auth0-react";
import { DeleteButton } from "features/auth";

const Settings = () => {
  const { user } = useAuth0();
  return (
    <div>
      <h2>Settings</h2>
      <section>
        <h3>Account Deletion</h3>
        {user && user.sub && <DeleteButton userId={user.sub} />}
      </section>
    </div>
  );
};

export default Settings;
