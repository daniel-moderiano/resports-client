import * as React from "react";

// This hook is used to capture user activity on videos, which can then direct things like showing/hiding controls.
export const useUserActivity = () => {
  const [userActive, setUserActive] = React.useState(false);
  // useRef must be used to avoid losing reference to timeout IDs during re-renders.
  const inactivityTimeout = React.useRef<null | NodeJS.Timeout>(null);

  const signalUserActivity = React.useCallback(() => {
    setUserActive(true);

    // Clear timeout is a safe function. Passing an invalid ID will not throw an exception.
    clearTimeout(inactivityTimeout.current as NodeJS.Timeout);
    inactivityTimeout.current = setTimeout(function () {
      setUserActive(false);
    }, 3000);
  }, []);

  return {
    userActive,
    setUserActive,
    signalUserActivity,
  };
};
