import styles from "components/Layout/styles/Nav.module.css";
import { Routes } from "config/routes";
import { SearchBar } from "features/search";
import HamburgerIcon from "icons/HamburgerIcon";
import Link from "next/link";
import { UserMenu } from "./UserMenu";

// In the future we will access the user property from React context or similar. This is a placeholder to allow development of the nav menu in authenticated and non-authenticated states while we await backend integration.

const user = false;

interface NavProps {
  showSidebar: boolean;
  toggleSidebar: () => void;
}

export const Nav = ({ showSidebar, toggleSidebar }: NavProps) => {
  return (
    <nav className={styles.header}>
      <div className={styles.leftContainer}>
        <button
          onClick={toggleSidebar}
          aria-controls="sidebar"
          aria-expanded={showSidebar}
          className={styles.sidebarButton}
          aria-label="Toggle sidebar"
        >
          <HamburgerIcon className={styles.hamburgerIcon} />
        </button>
        <h1 className={styles.headerTitle}>
          <Link className={`${styles.headerLink}`} href={Routes.home}>
            Resports
          </Link>
        </h1>
      </div>
      <SearchBar />
      <div className={styles.rightContainer}>
        {user ? (
          <UserMenu />
        ) : (
          <div>
            <Link href={Routes.login}>Log In</Link>
            <Link href={Routes.signup}>Sign Up</Link>
          </div>
        )}
      </div>
    </nav>
  );
};
