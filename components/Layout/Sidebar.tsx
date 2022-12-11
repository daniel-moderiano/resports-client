import styles from "components/Layout/styles/Sidebar.module.css";

interface SidebarProps {
  showSidebar: boolean;
  toggleSidebar: () => void;
}

export const Sidebar = ({ showSidebar, toggleSidebar }: SidebarProps) => {
  return (
    <div
      className={`${styles.sidebar} ${showSidebar ? styles.sidebarActive : ""}`}
      data-testid="sidebar"
      id="sidebar"
    >
      <button onClick={toggleSidebar}>Close</button>
      SB
    </div>
  );
};
