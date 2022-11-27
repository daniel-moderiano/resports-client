import * as React from "react";
import { Player } from "features/players";

// Provide a customised version of VOD seeking that lets the user queue seeks if pressing player controls within time limit of previous seek request.
export const useSeek = (player: Player | null) => {
  // The currently projected time (in seconds) that the player should be at once the currently queued seek completes.
  // When this is not null, it implies we are currently performing a seek() call.
  const [projectedTime, setProjectedTime] = React.useState<null | number>(null);
  // This state is used to help manage indicators that require the requested seek amount, not the updated projected time
  const [seekAmount, setSeekAmount] = React.useState<null | number>(null);
  const seekTimer = React.useRef<NodeJS.Timeout | null>(null);

  const scheduleSeek = React.useCallback(
    (timeToSkipInSeconds: number) => {
      if (player) {
        clearTimeout(seekTimer.current as NodeJS.Timeout);

        if (!seekAmount) {
          setSeekAmount(timeToSkipInSeconds);
        } else {
          setSeekAmount(timeToSkipInSeconds + seekAmount);
        }

        const currentTime = player.getCurrentTime();
        let updatedProjection: number;
        if (projectedTime) {
          updatedProjection = projectedTime + timeToSkipInSeconds;
        } else {
          updatedProjection = currentTime + timeToSkipInSeconds;
        }

        setProjectedTime(updatedProjection);

        seekTimer.current = setTimeout(() => {
          // Use the temp updatedProjection variable to ensure an accurate seek is performed rather than hoping setProjectedTime always resolves before this timeout assignment.
          player.seek(updatedProjection);
        }, 500);
      }
    },
    [player, projectedTime, seekAmount]
  );

  React.useEffect(() => {
    if (player) {
      // Ensure projectedTime is reset to null to avoid infinite loop seeking or video freezing at fixed time
      player.addEventListener("seek", () => {
        setProjectedTime(null);
        setSeekAmount(null);
      });
    }
  }, [player]);

  return {
    scheduleSeek,
    projectedTime,
    seekAmount,
  };
};
