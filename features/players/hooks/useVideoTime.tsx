import * as React from "react";
import { formatElapsedTime } from "utils/videoDurationConversion";
import { Player } from "features/players";

// Controls all aspects of video duration and returns a single duration that can be used as UI for video time
// Player agnostic, but only because both players have a getCurrentTime method. This tightly couples to these APIs, however passing in a 'getCurrentTime' function alone adds a layer of delay and causes jumpy UI durations.
export const useVideoTime = (player: Player, projectedTime: number | null) => {
  const durationInterval = React.useRef<null | NodeJS.Timer>(null);
  const [elapsedDuration, setElapsedDuration] = React.useState("");

  // This runs once only on first render to avoid an initial 1 second delay in showing elapsed time
  React.useEffect(() => {
    const elapsedTime = player.getCurrentTime();
    setElapsedDuration(formatElapsedTime(elapsedTime));
  }, [player]);

  React.useEffect(() => {
    // Must use top level clearInterval to avoid accumulating multiple intervals
    clearInterval(durationInterval.current as NodeJS.Timer);
    if (projectedTime) {
      setElapsedDuration(formatElapsedTime(projectedTime));
    } else {
      durationInterval.current = setInterval(() => {
        const elapsedTime = player.getCurrentTime();
        setElapsedDuration(formatElapsedTime(elapsedTime));
      }, 1000);
    }
  }, [player, projectedTime]);

  return {
    elapsedDuration,
  };
};
