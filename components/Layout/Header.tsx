import { Nav } from "./Nav";
import styles from "components/Layout/styles/Header.module.css";
import { SearchBar } from "features/search";
import Link from "next/link";

export const Header = () => {
  return (
    <header role="banner" className={styles.header}>
      <h1 className={styles.headerTitle}>
        <Link href="/">
          <a>Resports</a>
        </Link>
      </h1>
      <SearchBar />
      <Nav />
    </header>
  );
};
