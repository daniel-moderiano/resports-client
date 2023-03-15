import { Routes } from "config/routes";
import { useMenuCloseEvents } from "hooks/useMenuCloseEvents";
import { useKeyboardNavigation } from "hooks/useKeyboardMenuNavigation";
import Link from "next/link";
import { useState } from "react";
import * as React from "react";
import { LogoutButton } from "features/auth";
import styles from "components/Layout/styles/UserMenu.module.css";
import AvatarIcon from "icons/AvatarIcon";

type MenuProps = {
  closeMenu: () => void;
};

const Dropdown = ({ closeMenu }: MenuProps) => {
  const menuRef = React.useRef<HTMLUListElement | null>(null);
  useMenuCloseEvents("userMenu", closeMenu);
  useKeyboardNavigation(menuRef, false);
  return (
    <ul
      role="menu"
      aria-label="User navigation menu"
      className={styles.userMenuList}
      ref={menuRef}
      id="userMenuDropdown"
    >
      <li role="none">
        <Link
          role="menuitem"
          href={Routes.settings}
          onClick={closeMenu}
          className={styles.userMenuListItem}
        >
          Settings
        </Link>
      </li>
      <li role="none">
        <LogoutButton
          role="menuitem"
          onClick={closeMenu}
          className={styles.userMenuListItem}
        />
      </li>
    </ul>
  );
};

export const UserMenu = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div id="userMenu" className={styles.userMenu}>
      <button
        type="button"
        aria-controls="userMenuDropdown"
        aria-haspopup="true"
        aria-expanded={showMenu}
        aria-label={`${showMenu ? "Close" : "Open"} user menu dropdown`}
        className={styles.userMenuButton}
        onClick={() => {
          setShowMenu(!showMenu);
        }}
      >
        <AvatarIcon className={styles.avatarIcon} />
      </button>
      {showMenu && <Dropdown closeMenu={() => setShowMenu(false)} />}
    </div>
  );
};
