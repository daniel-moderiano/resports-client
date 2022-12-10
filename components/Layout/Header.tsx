import { Nav } from "./Nav";
import styles from "components/Layout/styles/Header.module.css";
import { SearchBar } from "features/search";
import Link from "next/link";

interface HeaderProps {
  showSidebar: boolean;
  toggleSidebar: () => void;
}

export const Header = ({ showSidebar, toggleSidebar }: HeaderProps) => {
  return (
    <header role="banner" className={styles.header}>
      <button
        onClick={toggleSidebar}
        aria-controls="sidebar"
        aria-expanded={showSidebar}
      >
        Toggle Sidebar
      </button>
      <h1 className={styles.headerTitle}>
        <Link href="/">Resports</Link>
      </h1>
      <SearchBar />
      <Nav />
    </header>
  );
};
