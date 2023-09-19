import styles from "components/Layout/styles/Sidebar.module.css";
import { useEscapeClose } from "hooks/useEscapeClose";
import * as React from "react";
import HamburgerIcon from "icons/HamburgerIcon";
import { SidebarSavedChannelsList } from "features/saved-channels/components/saved-channel-list/SidebarSavedChannelList";
import { useAuth0 } from "@auth0/auth0-react";

interface SidebarProps {
  showSidebar: boolean;
  closeSidebar: () => void;
}

export const Sidebar = ({ showSidebar, closeSidebar }: SidebarProps) => {
  useEscapeClose(closeSidebar);
  const { isAuthenticated } = useAuth0();
  return (
    <div
      className={`${styles.sidebar} ${showSidebar ? styles.sidebarActive : ""}`}
      data-testid="sidebar"
      id="sidebar"
      aria-label="Close sidebar"
    >
      <button onClick={closeSidebar} className={styles.sidebarButton}>
        <HamburgerIcon className={styles.hamburgerIcon} />
      </button>
      <div className={styles.sidebarBody}>
        {isAuthenticated ? (
          <SidebarSavedChannelsList closeSidebar={closeSidebar} />
        ) : (
          <p className={styles.loginMessage}>Log in to view saved channels</p>
        )}
      </div>
    </div>
  );
};
