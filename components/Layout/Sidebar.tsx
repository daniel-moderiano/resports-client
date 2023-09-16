import styles from "components/Layout/styles/Sidebar.module.css";
import { useEscapeClose } from "hooks/useEscapeClose";
import * as React from "react";
import HamburgerIcon from "icons/HamburgerIcon";
import { SidebarSavedChannelsList } from "features/saved-channels/components/saved-channel-list/SidebarSavedChannelList";

interface SidebarProps {
  showSidebar: boolean;
  closeSidebar: () => void;
}

export const Sidebar = ({ showSidebar, closeSidebar }: SidebarProps) => {
  useEscapeClose(closeSidebar);

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
        <div className={styles.sidebarHeader}>Saved channels</div>
        <div onClick={closeSidebar}>
          <SidebarSavedChannelsList />
        </div>
      </div>
    </div>
  );
};
