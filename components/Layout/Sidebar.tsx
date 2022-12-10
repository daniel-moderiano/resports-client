import styles from "components/Layout/styles/Sidebar.module.css";

interface SidebarProps {
  showSidebar: boolean;
  toggleSidebar: () => void;
}

export const Sidebar = ({ showSidebar, toggleSidebar }: SidebarProps) => {
  return (
    <div className={styles.sidebar} data-testid="sidebar" id="sidebar">
      <button onClick={toggleSidebar}>Toggle Sidebar</button>
      SB
    </div>
  );
};
