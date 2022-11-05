import Nav from "./Nav";
import styles from "../../styles/componentStyles/Header.module.css";
import SearchBar from "../SearchBar";
import Link from "next/link";

const Header = () => {
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

export default Header;
