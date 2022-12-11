import { useEffect } from "react";

const handleEscPress = (event: KeyboardEvent, closeElement: () => void) => {
  if (event.key === "Escape") {
    closeElement();
  }
};

// Use this hook to close any element or component when the escape key is pressed.
export const useEscapeClose = (closeElement: () => void) => {
  // Apply event listeners only once on initial component mount
  useEffect(() => {
    window.addEventListener("keydown", (event) =>
      handleEscPress(event, closeElement)
    );

    // Clean up event listeners on component dismount
    return () => {
      window.addEventListener("keydown", (event) =>
        handleEscPress(event, closeElement)
      );
    };
  }, [closeElement]);
};
