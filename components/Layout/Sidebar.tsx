import styles from "components/Layout/styles/Sidebar.module.css";
import { useEscapeClose } from "hooks/useEscapeClose";
import * as React from "react";

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
    >
      <button onClick={closeSidebar}>Close</button>
      SB
    </div>
  );
};
