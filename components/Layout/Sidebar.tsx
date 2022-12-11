import styles from "components/Layout/styles/Sidebar.module.css";
import * as React from "react";

interface SidebarProps {
  showSidebar: boolean;
  closeSidebar: () => void;
}

export const Sidebar = ({ showSidebar, closeSidebar }: SidebarProps) => {
  const sidebarRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const handleEscPress = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeSidebar();
      }
    };

    window.addEventListener("keydown", handleEscPress);

    return () => {
      window.addEventListener("keydown", handleEscPress);
    };
  }, [closeSidebar, showSidebar]);

  return (
    <div
      className={`${styles.sidebar} ${showSidebar ? styles.sidebarActive : ""}`}
      data-testid="sidebar"
      id="sidebar"
      ref={sidebarRef}
    >
      <button onClick={closeSidebar}>Close</button>
      SB
    </div>
  );
};
