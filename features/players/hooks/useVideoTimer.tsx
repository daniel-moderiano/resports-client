import * as React from "react";
import { formatElapsedTime } from "utils/videoDurationConversion";

// This hook is used to capture user activity on videos, which can then direct things like showing/hiding controls.
export const useVideoTime = (
  player: Twitch.Player,
  projectedTime: number | null
) => {
  const durationInterval = React.useRef<null | NodeJS.Timer>(null);

  // A constantly updated duration state to provide a video duration elapsed to the UI
  const [elapsedDuration, setElapsedDuration] = React.useState("");

  // An initial render effect only to avoid a 1 second delay in showing elapsed time
  React.useEffect(() => {
    const elapsedTime = player.getCurrentTime();
    setElapsedDuration(formatElapsedTime(elapsedTime));
  }, [player]);

  React.useEffect(() => {
    clearInterval(durationInterval.current as NodeJS.Timer);
    if (projectedTime) {
      setElapsedDuration(formatElapsedTime(projectedTime));
    } else {
      durationInterval.current = setInterval(() => {
        console.log(`Running interval ${durationInterval.current}`);

        const elapsedTime = player.getCurrentTime();
        setElapsedDuration(formatElapsedTime(elapsedTime));
      }, 1000);
    }
  }, [player, projectedTime]);

  return {
    elapsedDuration,
  };
};
