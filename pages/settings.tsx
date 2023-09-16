import { useAuth0 } from "@auth0/auth0-react";
import { DangerZone } from "features/settings/components/DangerZone";

const Settings = () => {
  const { user } = useAuth0();
  return (
    <div>
      <h2>Settings</h2>
      {user && <DangerZone user={user} />}
    </div>
  );
};

export default Settings;
