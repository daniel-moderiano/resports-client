import * as React from "react";

export const useUserActivity = () => {
  const [userActive, setUserActive] = React.useState(false);
  // useRef must be used here to avoid losing reference to timeout IDs as the component re-renders between hiding/showing controls
  const inactivityTimeout = React.useRef<null | NodeJS.Timeout>(null);
  // const enableCall = React.useRef(true);

  // A general user activity function. Use this whenever the user performs an 'active' action and it will signal the user is interacting with the video, which then enables other features such as showing controls
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
