// * If anchor tags are to be placed in the list items, these should become role="menuitem" and the <li> tags should have role="none"

// The Nav is also likely to contain a search bar and a logo, that links back to the home page
import styles from "components/Layout/styles/Nav.module.css";

export const Nav = () => {
  return (
    <nav role="navigation" className={styles.nav}>
      Nav
    </nav>
  );
};
