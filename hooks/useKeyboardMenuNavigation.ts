import * as React from "react";

// Trap focus within a dropdown menu and handle arrow navigation (still allow user to tab out of menu)
export const useKeyboardNavigation = (
  menuRef: React.MutableRefObject<HTMLDivElement | HTMLUListElement | null>,
  autoFocusFirstItem = true
) => {
  React.useEffect(() => {
    const menu = menuRef.current;

    // Grab all focusable elements within the menu
    if (!menu) {
      console.error("Accessible menu not found in the DOM");
      return;
    }

    const menuItems: NodeListOf<HTMLButtonElement | HTMLAnchorElement> =
      menu.querySelectorAll('[role="menuitem"]');

    // Focus the first menu item when the menu is first opened
    if (autoFocusFirstItem) {
      menuItems[0].focus();
    }

    // Add accessible up/down arroy key navigation to menu
    const handleKeyPress = (event: Event) => {
      // Narrow event type
      const isKeyboardEvent = (event: Event): event is KeyboardEvent => {
        return "key" in event;
      };

      if (!isKeyboardEvent(event)) {
        return;
      }

      let currentFocus = 0;

      // Set currently focused variable to correspond to the index of the currently focused menu item
      for (let i = 0; i < menuItems.length; i++) {
        if (menuItems[i] === document.activeElement) {
          currentFocus = i;
        }
      }

      // Perform unique action based on key pressed
      switch (event.key) {
        case "ArrowDown":
          event.preventDefault(); // avoid scrolling the entire browser window
          if (currentFocus < menuItems.length - 1) {
            // user is not at last item, move down menu
            currentFocus++;
          } else {
            // user is at last item, move to top item
            currentFocus = 0;
          }
          menuItems[currentFocus].focus();
          break;

        case "ArrowUp":
          event.preventDefault();
          if (currentFocus === 0) {
            // user is at top item, return to bottom item
            currentFocus = menuItems.length - 1;
          } else {
            // user is not at top item, move up list
            currentFocus--;
          }
          menuItems[currentFocus].focus();
          break;

        default:
          break;
      }
    };

    menu.addEventListener("keydown", handleKeyPress);

    return () => {
      menu.removeEventListener("keydown", handleKeyPress);
    };
  }, [menuRef]);
  return {
    menuRef,
  };
};
