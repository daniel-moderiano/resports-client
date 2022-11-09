import * as React from "react";

export const useUserActivity = () => {
  const [userActive, setUserActive] = React.useState(false);
  // useRef must be used here to avoid losing reference to timeout IDs as the component re-renders between hiding/showing controls
  // const inactivityTimeout = React.useRef<null | NodeJS.Timeout>(null);
  // const enableCall = React.useRef(true);

  let inactivityTimeout: null | NodeJS.Timeout = null;
  let enableCall = true;

  const signalUserActivity = () => {
    setUserActive(true);
    clearTimeout(inactivityTimeout as NodeJS.Timeout);

    inactivityTimeout = setTimeout(function () {
      setUserActive(false);
    }, 3000);
  };

  const throttleUserActivity = () => {
    if (!enableCall) {
      return;
    }

    enableCall = false;
    signalUserActivity();
    // Unsure exactly which throttle timeout will work best, but 500 seems adequate for now
    setTimeout(() => (enableCall = true), 500);
  };

  React.useEffect(() => {}, []);

  return {
    userActive,
    setUserActive,
    signalUserActivity,
    throttleUserActivity,
  };
};
