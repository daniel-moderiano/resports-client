import styles from "components/Layout/styles/Nav.module.css";
import { Routes } from "config/routes";
import Link from "next/link";

// In the future we will access the user property from React context or similar. This is a placeholder to allow development of the nav menu in authenticated and non-authenticated states while we await backend integration.

const user = false;

export const Nav = () => {
  if (user) {
    return (
      <nav role="navigation" className={styles.nav}>
        {/* Dropdown menu */}
      </nav>
    );
  } else {
    return (
      <nav role="navigation" className={styles.nav}>
        <Link href={"?"}>Log In</Link>
        <Link href={"?"}>Sign Up</Link>
      </nav>
    );
  }
};
