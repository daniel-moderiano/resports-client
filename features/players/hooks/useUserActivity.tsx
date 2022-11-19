import * as React from "react";

// This hook is used to capture user activity on videos, which can then direct things like showing/hiding controls.
export const useUserActivity = () => {
  // useRef must be used to avoid losing reference to timeout IDs during re-renders.
  const inactivityTimeout = React.useRef<null | NodeJS.Timeout>(null);
  const [userActive, setUserActive] = React.useState(false);

  // An overriding user active state that is unaffected by inactivity timeouts
  const [lockUserActive, setLockUserActive] = React.useState(false);

  // Prefer this over directly calling setUserActive, as that would bypass the userActivity lock
  const signalUserInactivity = React.useCallback(() => {
    if (!lockUserActive) {
      setUserActive(false);
    }
  }, [lockUserActive]);

  const signalUserActivity = React.useCallback(() => {
    setUserActive(true);

    // Clear timeout is a safe function. Passing an invalid ID will not throw an exception.
    clearTimeout(inactivityTimeout.current as NodeJS.Timeout);
    inactivityTimeout.current = setTimeout(function () {
      if (!lockUserActive) {
        setUserActive(false);
      }
    }, 3000);
  }, [lockUserActive]);

  return {
    userActive,
    signalUserInactivity,
    signalUserActivity,
    setLockUserActive,
  };
};
