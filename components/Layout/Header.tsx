import { Nav } from "./Nav";
import styles from "components/Layout/styles/Header.module.css";
import { SearchBar } from "features/search";
import Link from "next/link";
import HamburgerIcon from "icons/HamburgerIcon";
import localFont from "@next/font/local";

// Font files can be colocated inside of `pages`
const titleFont = localFont({
  src: "./assets/fonts/montserrat-alt1/MontserratAlt1-Medium.woff2",
  // adjustFontFallback: false,
});

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
        <h1>
          <Link
            className={`${styles.headerTitle} ${titleFont.className}`}
            href="/"
          >
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
