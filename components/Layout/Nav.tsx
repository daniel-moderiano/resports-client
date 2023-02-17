import LoginButton from "components/Auth0/LoginButton";
import LogoutButton from "components/Auth0/LogoutButton";
import styles from "components/Layout/styles/Nav.module.css";
import { Routes } from "config/routes";
import { SearchBar } from "features/search";
import HamburgerIcon from "icons/HamburgerIcon";
import Link from "next/link";
import { useRouter } from "next/router";
import { UserMenu } from "./UserMenu";

// In the future we will access the user property from React context or similar. This is a placeholder to allow development of the nav menu in authenticated and non-authenticated states while we await backend integration.

const user = false;

interface NavProps {
  showSidebar: boolean;
  toggleSidebar: () => void;
}

export const Nav = ({ showSidebar, toggleSidebar }: NavProps) => {
  const { pathname } = useRouter();

  return (
    <nav className={styles.nav}>
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
            {/* <Link
              aria-current={pathname === Routes.login ? "page" : "false"}
              href={Routes.login}
            >
              Log In
            </Link> */}
            <LoginButton />
            <LogoutButton />

            <Link
              href={Routes.signup}
              aria-current={pathname === Routes.signup ? "page" : "false"}
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};
