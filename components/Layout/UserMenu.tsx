import { Routes } from "config/routes";
import CaretIcon from "icons/CaretIcon";
import Link from "next/link";
import { useState } from "react";

export const UserMenu = () => {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <div>
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
        <ul role="menu" aria-label="User navigation menu" data-testid="">
          <li role="none">
            <Link role="menuitem" href={Routes.about}>
              About
            </Link>
          </li>
          <li role="none">
            <Link role="menuitem" href={Routes.settings}>
              Settings
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
};
