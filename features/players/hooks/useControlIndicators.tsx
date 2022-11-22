import * as React from "react";
import { ControlAction } from "../components/VideoPlayer";

// Use this hook to trigger control indicators whent he user activates certain player controls
export const useControlIndicators = () => {
  const [controlAction, setControlAction] =
    React.useState<ControlAction | null>(null);
  const [showControlIndicator, setShowControlIndicator] = React.useState(false);

  const triggerControlIndication = React.useCallback(
    (action: ControlAction) => {
      setShowControlIndicator(true);
      setControlAction(action);

      // The delay here must be LOWER than the CSS animation associated, otherwise there is a flash of the control icon after the animation completes
      setTimeout(() => {
        setShowControlIndicator(false);
      }, 450);
    },
    []
  );

  return {
    controlAction,
    showControlIndicator,
    triggerControlIndication,
  };
};
