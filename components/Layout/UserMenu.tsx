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
        onClick={() => {
          setShowMenu(!showMenu);
        }}
      >
        <CaretIcon />
      </button>
      {showMenu && (
        <ul role="menu" aria-label="User navigation menu">
          <li role="none">
            <Link role="menuitem" href={Routes.login}>
              Log In
            </Link>
          </li>
          <li role="none">
            <Link role="menuitem" href={Routes.signup}>
              Sign Up
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
};
