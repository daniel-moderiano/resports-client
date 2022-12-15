import { Nav } from "./Nav";
import styles from "components/Layout/styles/Header.module.css";
import { SearchBar } from "features/search";
import Link from "next/link";
import HamburgerIcon from "icons/HamburgerIcon";

interface HeaderProps {
  showSidebar: boolean;
  toggleSidebar: () => void;
}

export const Header = ({ showSidebar, toggleSidebar }: HeaderProps) => {
  return (
    <header role="banner" className={styles.header}>
      <div className={styles.leftContainer}>
        <button
          onClick={toggleSidebar}
          aria-controls="sidebar"
          aria-expanded={showSidebar}
          className={styles.sidebarButton}
        >
          <HamburgerIcon className={styles.hamburgerIcon} />
        </button>
        <h1 className={styles.headerTitle}>
          <Link className={`${styles.headerLink}`} href="/">
            Resports
          </Link>
        </h1>
      </div>
      {/* <div className={styles.rightContainer}> */}
      <SearchBar />
      <Nav />
      {/* </div> */}
    </header>
  );
};
