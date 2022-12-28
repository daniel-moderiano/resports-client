import styles from "components/Layout/styles/Nav.module.css";
import { Routes } from "config/routes";
import Link from "next/link";
import { useState } from "react";

// In the future we will access the user property from React context or similar. This is a placeholder to allow development of the nav menu in authenticated and non-authenticated states while we await backend integration.

const user = false;

export const Nav = () => {
  const [showMenu, setShowMenu] = useState(false);
  if (user) {
    return (
      <nav role="navigation" className={styles.nav}>
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
      </nav>
    );
  } else {
    return (
      <nav role="navigation" className={styles.nav}>
        <ul>
          <li>
            <Link href={Routes.login}>Log In</Link>
          </li>
          <li>
            <Link href={Routes.signup}>Sign Up</Link>
          </li>
        </ul>
      </nav>
    );
  }
};
