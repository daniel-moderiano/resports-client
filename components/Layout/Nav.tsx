// * If anchor tags are to be placed in the list items, these should become role="menuitem" and the <li> tags should have role="none"

// The Nav is also likely to contain a search bar and a logo, that links back to the home page
import styles from "../../styles/componentStyles/Nav.module.css";

const Nav = () => {
  return (
    <nav role="navigation" className="nav">
      <ul role="menubar" className={styles.navList}>
        <li role="menuitem" className={styles.navListItem}>
          Home
        </li>
        <li role="menuitem" className={styles.navListItem}>
          Sign up
        </li>
        <li role="menuitem" className={styles.navListItem}>
          Log in
        </li>
        <li role="menuitem" className={styles.navListItem}>
          Log out
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
