import * as React from "react";
import { ControlAction } from "../types/playerTypes";

// Use this hook to trigger control indicators whent he user activates certain player controls
export const useControlIndicators = () => {
  const [controlAction, setControlAction] =
    React.useState<ControlAction | null>(null);
  const [showControlIndicator, setShowControlIndicator] = React.useState(false);

  const triggerControlIndication = React.useCallback(
    (action: ControlAction) => {
      setShowControlIndicator(true);
      setControlAction(action);

      // This gives us the quickest and most conceptually correct cancellation of triggering the indicator animation (as opposed to a setTimeout), and allows the animation to be restarted up to 60 times/second.
      window.requestAnimationFrame(() => {
        setShowControlIndicator(false);
      });
    },
    []
  );

  return {
    controlAction,
    showControlIndicator,
    triggerControlIndication,
  };
};
