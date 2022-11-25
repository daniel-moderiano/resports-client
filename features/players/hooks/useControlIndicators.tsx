import * as React from "react";
import { ControlAction } from "../types/playerTypes";

// Use this hook to trigger control indicators whent he user activates certain player controls
export const useControlIndicators = () => {
  const [controlAction, setControlAction] =
    React.useState<ControlAction | null>(null);
  const [showControlIndicator, setShowControlIndicator] = React.useState(false);
  const [showVolumeLevelIndicator, setShowVolumeLevelIndicator] =
    React.useState(false);

  const timer = React.useRef<NodeJS.Timeout | null>(null);

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

  const triggerVolumeLevelIndication = React.useCallback(() => {
    setShowVolumeLevelIndicator(true);
    clearTimeout(timer.current as NodeJS.Timeout);

    timer.current = setTimeout(() => {
      setShowVolumeLevelIndicator(false);
    }, 500);
  }, []);

  return {
    controlAction,
    showControlIndicator,
    triggerControlIndication,
    triggerVolumeLevelIndication,
    showVolumeLevelIndicator,
  };
};
