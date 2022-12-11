import styles from "components/Layout/styles/Sidebar.module.css";
import * as React from "react";

interface SidebarProps {
  showSidebar: boolean;
  closeSidebar: () => void;
}

export const Sidebar = ({ showSidebar, closeSidebar }: SidebarProps) => {
  const sidebarRef = React.useRef<HTMLDivElement | null>(null);

  // React.useEffect(() => {
  //   const handleOutsideClick = (event: MouseEvent) => {
  //     const clickTarget = event.target as HTMLElement;

  //     if (sidebarRef.current) {
  //       if (!clickTarget.closest(sidebarRef.current.id) && showSidebar) {
  //         closeSidebar();
  //       }
  //     }
  //   };

  //   window.addEventListener("click", handleOutsideClick);

  //   return () => {
  //     window.removeEventListener("click", handleOutsideClick);
  //   };
  // }, [closeSidebar, showSidebar]);

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
