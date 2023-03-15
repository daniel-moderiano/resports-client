import { Routes } from "config/routes";
import { useMenuCloseEvents } from "hooks/useMenuCloseEvents";
import CaretIcon from "icons/CaretIcon";
import Link from "next/link";
import { useState } from "react";
import * as React from "react";
import { LogoutButton } from "features/auth";
import styles from "components/Layout/styles/UserMenu.module.css";
import AvatarIcon from "icons/AvatarIcon";

export const UserMenu = () => {
  const [showMenu, setShowMenu] = useState(false);
  useMenuCloseEvents("userMenu", () => setShowMenu(false));
  return (
    <div id="userMenu" className={styles.userMenu}>
      <button
        type="button"
        aria-controls="dropdown"
        aria-haspopup="true"
        aria-expanded={showMenu}
        aria-label="Open user menu"
        className={styles.userMenuButton}
        onClick={() => {
          setShowMenu(!showMenu);
        }}
      >
        <AvatarIcon className={styles.avatarIcon} />
      </button>
      {showMenu && (
        <ul
          role="menu"
          aria-label="User navigation menu"
          className={styles.userMenuList}
        >
          <li role="none" className={styles.userMenuListItem}>
            <Link
              role="menuitem"
              href={Routes.settings}
              onClick={() => setShowMenu(false)}
              className={styles.userMenuListButton}
            >
              Settings
            </Link>
          </li>
          <li role="none" className={styles.userMenuListItem}>
            <LogoutButton
              role="menuitem"
              onClick={() => setShowMenu(false)}
              className={styles.userMenuListButton}
            />
          </li>
        </ul>
      )}
    </div>
  );
};
