import { useEffect } from "react";

// Use this hook for any menu to apply common 'expected' UX features such as closing on outside click or escape key press. Takes ID of the element to apply these events to, and the function that closes/dismissed the element
export const useMenuCloseEvents = (
  menuElementId: string,
  closeElement: () => void
) => {
  // Effect to apply event listeners once on initial component mount
  useEffect(() => {
    // Ensure the element closes when the user clicks any element outside the target element
    const handleOutsideClick = (event: MouseEvent) => {
      const clickTarget = event.target as HTMLElement;
      console.log(clickTarget);

      if (!clickTarget.closest(`#${menuElementId}`)) {
        closeElement();
      }
    };

    // Ensure the element closes when the user presses the Escape key
    const handleEscPress = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeElement();
      }
    };

    window.addEventListener("click", handleOutsideClick);
    window.addEventListener("keydown", handleEscPress);

    // Clean up event listeners on component dismount
    return () => {
      window.removeEventListener("click", handleOutsideClick);
      window.addEventListener("keydown", handleEscPress);
    };
  }, [closeElement, menuElementId]);
};
