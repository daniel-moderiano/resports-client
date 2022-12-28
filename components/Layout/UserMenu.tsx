import { Routes } from "config/routes";
import { useMenuCloseEvents } from "hooks/useMenuCloseEvents";
import CaretIcon from "icons/CaretIcon";
import Link from "next/link";
import { useState } from "react";
import * as React from "react";

export const UserMenu = () => {
  const [showMenu, setShowMenu] = useState(true);
  const menuRef = React.useRef<HTMLUListElement | null>(null);
  useMenuCloseEvents("userMenu", () => setShowMenu(false));
  return (
    <div id="userMenu">
      <button
        type="button"
        aria-controls="dropdown"
        aria-haspopup="true"
        aria-expanded={showMenu}
        aria-label="Open user menu"
        onClick={() => {
          setShowMenu(!showMenu);
        }}
      >
        User Menu
        <CaretIcon />
      </button>
      {showMenu && (
        <ul
          role="menu"
          aria-label="User navigation menu"
          data-testid=""
          ref={menuRef}
        >
          <li role="none">
            <Link
              role="menuitem"
              href={Routes.about}
              onClick={() => setShowMenu(false)}
            >
              About
            </Link>
          </li>
          <li role="none">
            <Link
              role="menuitem"
              href={Routes.settings}
              onClick={() => setShowMenu(false)}
            >
              Settings
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
};
