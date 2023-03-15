import { LoginButton } from "features/auth";
import styles from "components/Layout/styles/Nav.module.css";
import { Routes } from "config/routes";
import { SearchBar } from "features/search";
import HamburgerIcon from "icons/HamburgerIcon";
import Link from "next/link";
import { UserMenu } from "./UserMenu";
import { useAuth0 } from "@auth0/auth0-react";
import { SignupButton } from "features/auth/components/SignupButton";
import { Button } from "components/button/Button";

interface NavProps {
  showSidebar: boolean;
  toggleSidebar: () => void;
}

export const Nav = ({ showSidebar, toggleSidebar }: NavProps) => {
  const { isAuthenticated } = useAuth0();

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
        <div>
          {isAuthenticated ? (
            <UserMenu />
          ) : (
            <>
              <LoginButton />
              <SignupButton />
              <Button size="default" variant="danger">
                Test Button
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
